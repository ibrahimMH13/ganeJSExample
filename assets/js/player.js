const canvas = document.getElementById('canvas-main');
const dropDown = document.getElementById('animations');

dropDown.addEventListener('change',function (e){
    setPlayerState = e.target.value;
});
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 100;
const spriteHeight = 92;
const playImage = new Image();
const staggerFrames = 5;
const spriteAnimations =[];
/**
 * frames here in animate state refer to state that have in image
 */
const animateStates =[
    {
        name:'idle',
        frames:7
    },
    {
        name:'jump',
        frames:7
    },
    {
        name:'fall',
        frames:7
    },
    {
        name:'run',
        frames:9
    },
    {
        name:'dizzy',
        frames:11
    },
    {
        name:'sit',
        frames:5
    },
    {
        name:'roll',
        frames:7
    },
    {
        name:'bite',
        frames:7
    },
    {
        name:'ko',
        frames:12
    },
    {
        name:'getHit',
        frames:4
    },
];
animateStates.forEach((state,index)=>{
    let frames ={
        loc:[],
    }
   for (let i=0; i<state.frames; i++){
       let positionX = i * spriteWidth;
       let positionY = index * spriteHeight;
       frames.loc.push({x:positionX,y:positionY});
       spriteAnimations[state.name] = frames;
   }
});
let gameFrame = 0;
let setPlayerState = 'idle';
      playImage.src ="../assets/iamges/player.png";
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // 6 here because I've 6 frame in player image
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[setPlayerState].loc.length;
    let frameY = spriteAnimations[setPlayerState].loc[position].y;
    let frameX = spriteAnimations[setPlayerState].loc[position].x;
    /*
    s =source
    d = destinations
        drawImage(image,sx,sy,sw,sh,dx,dy,dw,wh)
     */
    ctx.drawImage(playImage,frameX, frameY,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();