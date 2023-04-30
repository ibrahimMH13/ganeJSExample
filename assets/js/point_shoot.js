const canvas = document.getElementById('canvas-main');
const ctx    = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasCollision = document.getElementById('canvas-collision');
const collisionCtx    = canvasCollision.getContext('2d');
canvasCollision.width = window.innerWidth;
canvasCollision.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval  = 500;
let lastTime = 0;
let ravens = [];
let explosions = [];
let particles = [];
let score = 0;
let isGameOver = 0;
ctx.font="50px Impact";
class Raven{
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifer = Math.random() *  0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifer;
        this.height = this.spriteHeight * this.sizeModifer;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedAsPass =false;
        this.image = new Image();
        this.frame = 0;
        this.maxFrame = 4;
        this.timeFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.image.src = "../assets/iamges/raven.png";
        this.randomColors =[Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)]
        this.color = 'rgb('+this.randomColors[0]+','+this.randomColors[1]+','+this.randomColors[2]+')';
        this.hasTrail = Math.random() > 0.7;
    }

    update(deltatime){
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x <0 - this.width) this.markedAsPass = true;
        this.timeFlap+=deltatime;
        if (this.timeFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame=0;
            else this.frame++;
            this.timeFlap=0;
            if (this.hasTrail){
                for (let i=0;i<5;i++){
                    particles.push(new Particle(this.x,this.y,this.width,this.color))
                }
            }
        }
        this.x < 0 - this.width?isGameOver=true:false;
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x,
                            this.y,
                            this.width,
                            this.height);
        ctx.drawImage(this.image,
                      this.frame * this.spriteWidth,
                      0,
                      this.spriteWidth,
                      this.spriteHeight,
                      this.x,
                      this.y,
                      this.width,
                      this.height);
    }
}
class Particle{
    constructor(x,y,size,color) {
        this.size = size;
        this.x =x + this.size/2 + Math.random()*50-25;
        this.y =y + this.size/3+ Math.random()*50-25;
        this.radius = Math.random() * this.size /10;
        this.maxRadius = Math.random() * 20 + 35;
        this.speedX = Math.random() + 0.5;
        this.color = color;
        this.markedAsDeletion = false;

    }
    update(){
        this.x+=this.speedX;
        this.radius +=.5;
        if (this.radius > this.maxRadius - 5)
            this.markedAsDeletion = true;
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI *2);
        ctx.fill();
        ctx.restore();

    }
}
class Explosion{
    constructor(x,y,size) {
        this.image = new Image(),
            this.image.src = '../assets/iamges/boom.png';
        this.spriteWidth = 100;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = "../assets/sound/boom.wav";
        this.timeLastFrame = 0;
        this.frameInterval = 200;
        this.markedAsPass = false;
    }

    update(deltatime){
        if (this.frame ===0) this.sound.play();
        this.timeLastFrame += deltatime;
        if (this.timeLastFrame > this.frameInterval){
            this.frame++;
            this.timeLastFrame = 0;
            if (this.frame >5) this.markedAsPass = true;
        }
    }
    draw(){
        ctx.drawImage(this.image,
                    this.frame * this.spriteWidth,
                    0,
                    this.spriteWidth,
                    this.spriteHeight,
                    this.x ,
                    this.y - this.spriteHeight/ 4 ,
                    this.size,
                    this.size);
    }
}
//timestamp this came from js built in backback but first time will be undfine, so we can pass 0
function animate(timestamp){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime =  timestamp;
    timeToNextRaven += deltatime;
    drawScore();
    if (timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function (a,b){
            return a.width - b.width;
        });
    }
    [...particles,...ravens,...explosions].forEach(object=>{
        object.update(deltatime);
    });
    [...particles,...ravens,...explosions].forEach(object=>{
        object.draw();
    });
    ravens = ravens.filter(raven=> !raven.markedAsPass);
    explosions = explosions.filter(explosion=> !explosion.markedAsPass);
    particles = particles.filter(particle=> !particle.markedAsPass);
    if (isGameOver) drawGameOver();
    else requestAnimationFrame(animate);

}
function drawGameOver(){
    ctx.textAlign='center';
    ctx.fillStyle ='black';
    ctx.fillText('GAME OVER, your score is ' + score,canvas.width/2,canvas.height/2);
    ctx.fillStyle ='white';
    ctx.fillText('GAME OVER, your score is ' + score,canvas.width/2,canvas.height/2);
}
function drawScore(){
    ctx.fillStyle='black';
    ctx.fillText('Score: '+ score,50,75);
    ctx.fillStyle='white';
    ctx.fillText('Score: '+ score,55,80);
}
window.addEventListener('click',function (e){
  const detectPixelColor = collisionCtx.getImageData(e.x,e.y,1,1);
        detectPixelColor.willReadFrequently = true;
  const pc = detectPixelColor.data;
 ravens.forEach(raven=>{
     if (raven.randomColors[0] === pc[0] &&
         raven.randomColors[1] === pc[1] &&
         raven.randomColors[2] === pc[2]) {
         explosions.push(new Explosion(raven.x,raven.y,raven.width))
         raven.markedAsPass = true;
         score++;
     }
 });
});
animate(0);