import {Player} from '../game/player.js'
import {HandlerInput} from '../game/input.js';
import {Background} from "./bgLayers.js";
import {FlyingEnemy,GroundEnemy,ClimbingEnemy} from "./enemies.js";

window.addEventListener('load',()=>{
    const canvas = document.getElementById('canvas-main');
    const ctx = canvas.getContext('2d');
          canvas.width  = 500;
          canvas.height = 500;

    class Game{
        constructor(width,height) {
            this.width  = width;
            this.height = height;
            this.marginGround = 50;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new HandlerInput(this);
            this.enemies =[];
            this.enemyTimer =0;
            this.enemyIntrval =1000;
            this.debug = false;
            this.gameScore = 0;
        }
        update(detlaTime){
            this.background.update();
            this.player.update(this.input.keys,detlaTime);
            //handler new Enemy
            if (this.enemyTimer > this.enemyIntrval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else {
                this.enemyTimer+= detlaTime;
            }
            this.enemies.forEach(enemy=>{
               enemy.update(detlaTime);
               if (enemy.markForDeletion){
                   this.enemies.splice(this.enemies.indexOf(enemy),1);
               }
            });
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy=>{
                enemy.draw(context);
            });

        }
        addEnemy(){
            if (this.speed > 0 && Math.random() <.5 )this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0 )this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width,canvas.height);
    let lastTime =0 ;
    function animate(timestamp){
       let detlaTime = timestamp - lastTime;
       lastTime = timestamp;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.update(detlaTime);
        game.draw(ctx);

        requestAnimationFrame(animate);
    }
    animate(0);
});