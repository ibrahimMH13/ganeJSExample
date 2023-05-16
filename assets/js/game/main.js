import {Player} from '../game/player.js'
import {HandlerInput} from '../game/input.js';
window.addEventListener('load',()=>{
    const canvas = document.getElementById('canvas-main');
    const ctx = canvas.getContext('2d');
          canvas.width  = 500;
          canvas.height = 500;

    class Game{
        constructor(width,height) {
            this.width  = width;
            this.height = height;
            this.marginGround =50;

            this.player = new Player(this);
            this.input = new HandlerInput();
        }
        update(detlaTime){
            this.player.update(this.input.keys,detlaTime);
        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width,canvas.height);
    let lastTime =0 ;
    function animate(timestamp){
       let detlaTime = timestamp - lastTime;
       lastTime = timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.draw(ctx);
        game.update(detlaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});