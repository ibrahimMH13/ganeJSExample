/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas-main');
const ctx = canvas.getContext('2d');
const enemiesNumbers = 10;
const enemiesObject = [];

CANVAS_HEIGHT = ctx.height =800;
CANVAS_WIDTH  = ctx.width  =400;
let gameFrame = 0;
class Enemy{
    constructor() {
        this.enemyImage = new Image();
        this.enemyImage.src = '../assets/iamges/enemy4.png';
        this.speed = Math.random() * 8 + 2;
        this.spriteWidth = 218;
        this.spriteHight = 177;
        this.width = this.spriteWidth /6;
        this.height = this.spriteHight /7.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.newX =  Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.4+  0.7;
        this.intraval = Math.floor(Math.random() * 500+50);
        //this.curve =  Math.random()  * 200 +10;
    }
    update(){
        // this.x+= Math.random() * 5 - 1.5;pattern 1
        // this.y+= Math.random() * 5 - 1.5;
       // this.x-= this.speed;pattern 2
       // this.y += this.curve * Math.sin(this.angle); pattern 2
        //pattern 3
       //  this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/70) + canvas.width/2 - this.width;
       //  this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/300) + canvas.height/2 - this.height;
        // pattern 4

        this.angle+= this.angleSpeed;
        if (gameFrame % this.intraval ===0){
            this.newX =  Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x-= dx/70;
        this.y-= dy/70;
        if (gameFrame% this.flapSpeed ===0){
            this.frame > 4 ? this.frame = 0:this.frame++;
        }
        //4 here that frame we have in same enemy image
    }
    draw(){
        ctx.drawImage(this.enemyImage,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHight,this.x,this.y,this.width,this.height);
    }
}
for (let i=0; i<enemiesNumbers;i++){
    enemiesObject.push(new Enemy());
}
console.log(enemiesObject);
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    enemiesObject.forEach(object=>{
        object.update();
        object.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();