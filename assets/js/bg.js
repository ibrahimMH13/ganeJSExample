const canvas = document.getElementById('canvas-main');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 400;
const slider = document.getElementById('slider');
const showSpeed = document.getElementById('show-speed');
let gameSpeed = 10;
let gameFrame = 0;
slider.value = gameSpeed;
showSpeed.innerHTML = gameSpeed;
slider.addEventListener('change',(e)=>{
   gameSpeed = e.target.value;
   showSpeed.innerHTML = gameSpeed;
});

const bgLayer1 = new Image();
      bgLayer1.src='../assets/iamges/bg-layer-1.png';
const bgLayer2 = new Image();
      bgLayer2.src='../assets/iamges/bg-layer-2.png';
const bgLayer3 = new Image();
      bgLayer3.src='../assets/iamges/bg-layer-3.png';
const bgLayer4 = new Image();
      bgLayer4.src='../assets/iamges/bg-layer-4.png';
const bgLayer5 = new Image();
      bgLayer5.src='../assets/iamges/bg-layer-5.png';

window.addEventListener('load',()=>{
    class Layer{
        constructor(image,speedModifier) {
            this.x =0;
            this.y = 0;
            this.width = 2400;
            this.height = 400;
            // this.x2 = this.width;
            this.image = image;
            this.speedModifier = speedModifier;
        }

        update(){
            this.speed = gameSpeed * this.speedModifier;
            this.x =  gameFrame * this.speed % this.width;
        }

        draw(){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
            ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height);
        }
    }
    const layer1 = new Layer(bgLayer1,0.2);
    const layer2 = new Layer(bgLayer2,0.4);
    const layer3 = new Layer(bgLayer3,0.6);
    const layer4 = new Layer(bgLayer4,0.8);
    const layer5 = new Layer(bgLayer5,1);
    const gameObjects = [
        layer1,
        layer2,
        layer3,
        layer4,
        layer5,
    ];
    function animate(){
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        gameObjects.forEach(object=>{
            object.update();
            object.draw();
        });
        gameFrame--;
        requestAnimationFrame(animate);
    }
    animate();
});
