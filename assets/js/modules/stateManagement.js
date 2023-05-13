import Player from "./player.js";
import InputHandler from "./input.js";
import {drawStateText} from "./utils.js";

window.addEventListener('load',(e)=>{
    loading.style.display = 'none';
    const ctx = gCanvas.getContext('2d');
    gCanvas.width = window.innerWidth;
    gCanvas.height = window.innerHeight;

    const player = new Player(gCanvas.width,gCanvas.height);
    const input = new InputHandler();
    let lastTime = 0;
    function animate(timestamp){
        const deltaTime = timestamp - lastTime;
        lastTime = deltaTime;
        ctx.clearRect(0,0,gCanvas.width,gCanvas.height)
        player.update(input.lastkey);
        player.draw(ctx,deltaTime);
        drawStateText(ctx,input,player)
        requestAnimationFrame(animate);
    }
    animate(0);
});
