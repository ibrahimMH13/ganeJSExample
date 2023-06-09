import {Sitting,Running,Jumping,Falling,Rolling} from '../game/playerState.js';
export  class Player{
    constructor(game) {
        this.game   = game;
        this.width  = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.marginGround;
        this.image = playerImg;
        this.speed = 3;
        this.maxSpeed = 10;
        this.vy =0;
        this.weight =1;
        this.states =[new Sitting(this),new Running(this),new Jumping(this),new Falling(this),new Rolling(this)];
        this.currentState =this.states[0];
        this.currentState.enter();
        this.frameX =0;
        this.frameY =0;
        this.maxFrame =5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(input,timestamp){
        this.checkCollision();
        this.currentState.inputHandler(input);
        //horizontal
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed=0;
        if (this.x <0) this.x=0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        //vertical
        if(input.includes('ArrowUp') && this.onGround()) this.vy-=20;
        this.y += this.vy;
        if (!this.onGround()) this.vy+=this.weight;
        else this.vy=0;
        //sprite animate
        if (this.frameTimer  > this.frameInterval){
            this.frameTimer  = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }else {
            this.frameTimer+=timestamp;
        }
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x,this.y,this.width,this.height);
        context.drawImage(this.image,
                          this.frameX * this.width,
                          this.frameY * this.height,
                          this.width,
                          this.height,
                          this.x,
                          this.y,
                          this.width,
                          this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.marginGround;
    }

    setState(state,speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision(){
       this.game.enemies.forEach(enemy=>{
         if (enemy.x < this.x + this.width &&
            enemy.x + enemy.width > this.x &&
            enemy.y < this.y +this.height &&
         enemy.y + enemy.height > this.y){
             enemy.markForDeletion = true;
             this.game.gameScore++;
         }
       });
       console.log(this.game.gameScore);
    }
}