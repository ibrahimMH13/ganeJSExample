 window.addEventListener('load',(e)=>{
     const canvas = document.getElementById('canvas-main');
     const ctx = canvas.getContext('2d');
           ctx.width = 500;
           ctx.height = 800;

     class Game{
         constructor(context,width,height) {
             this.ctx = context;
             this.width = width;
             this.height = height;
             this.enemies = [];
             this.enemyInterval = 500;
             this.enemyTimer =0;
             this.enemyTypes =['worm','ghost','spider'];
         }

         update(deltaTime){
             this.enemies = this.enemies.filter(enemy=> !enemy.markForDeletion);
             if (this.enemyTimer > this.enemyInterval){

                 this.#addNewEnemy();
                 console.log(this.enemies);
                 this.enemyTimer = 0;
             }else {
                 this.enemyTimer+=deltaTime;
             }
            this.enemies.forEach(enemy=>enemy.update(deltaTime));
         }

         draw(){
             this.enemies.forEach(enemy=>enemy.draw(this.ctx));
         }

         #addNewEnemy(){
             const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if (randomEnemy ==='worm'){
                this.enemies.push(new Worm(this));
            }else if(randomEnemy ==='ghost'){
                this.enemies.push(new Ghost(this));
            }else if(randomEnemy ==='spider'){
                this.enemies.push(new Spider(this));
            }
            this.enemies.sort(function (a,b){
                return a.y - b.y;
            })
         }
     }

     class Enemy{
         constructor(game) {
            this.game = game;
            this.markForDeletion = false;
            this.frameX =0;
            this.maxFrameX = 5;
            this.frameIntraval =100;
            this.frameTime =0;
         }
         update(deltaTime){
             this.x-= this.speedX * deltaTime;
             if (this.x < 0 - this.width) this.markForDeletion = true;
             if (this.frameTime > this.frameIntraval){
                    if (this.frameX < this.maxFrameX) this.frameX++;
                    else this.frameX =0;
                    this.frameTime =0;
             }else {
                this.frameTime+=deltaTime;
             }

         }
         draw(ctx){
             ctx.drawImage(this.image,
                            this.frameX * this.spriteWidth,
                            0,
                            this.spriteWidth,
                            this.spriteHeight,
                            this.x,
                            this.y,
                            this.width,
                            this.height)
         }
     }
     class Worm extends Enemy{
         constructor(game) {
             super(game);
             this.spriteWidth = 229;
             this.spriteHeight = 171;
             this.x      = this.game.width;
             this.y      = Math.random() * this.game.height;
             this.width  = this.spriteWidth/4;
             this.height = this.spriteHeight/4;
             this.image  = worm;
             this.speedX = Math.random() * 0.1 + .1;
         }
     }
     class Ghost extends Enemy{
         constructor(game) {
             super(game);
             this.spriteWidth = 261;
             this.spriteHeight = 209;
             this.width  = this.spriteWidth/4;
             this.height = this.spriteHeight/4;
             this.x      = this.game.width;
             this.y      = Math.random() * this.game.height *.6;
             this.image  = ghost;
             this.speedX = Math.random() * 0.2 + .1;
             this.angle = 0;
             this.curve = Math.random() * 3;
         }
         draw(ctx) {
             ctx.save();
             ctx.globalAlpha =0.8;
             super.draw(ctx);
             ctx.restore();
         }
         update(deltaTime) {
             super.update(deltaTime);
             this.y += Math.sin(this.angle) * this.curve;
             this.angle+=0.09;
         }
     }
     class Spider extends Enemy{
         constructor(game) {
             super(game);
             this.spriteWidth = 310;
             this.spriteHeight = 175;
             this.width  = this.spriteWidth/5;
             this.height = this.spriteHeight/5;
             this.x      = Math.random() * this.game.width;
             this.y      = 0 - this.height;
             this.image  = spider;
             this.speedX = 0;
             this.speedY = Math.random() * 0.1 + 0.1;
             this.angle = 0;
             this.curve = Math.random() * 3;
             this.maxLength = Math.random() * this.game.height;
         }
         draw(ctx) {
             ctx.beginPath();
             ctx.moveTo(this.x + this.width/2,0);
             ctx.lineTo(this.x + this.width/2,this.y+10);
             ctx.stroke();
             super.draw(ctx);
         }
         update(deltaTime) {
             super.update(deltaTime);
             this.y += this.speedY * deltaTime;
             if (this.y > this.maxLength) this.speedY *=-1;
         }
     }

    let lastTime = 1;
     const game = new Game(ctx,canvas.width,canvas.height);
     function animate(timestamp){
         ctx.clearRect(0,0,canvas.width,canvas.height);
         const deltaTime = timestamp - lastTime;
         lastTime  = timestamp;
         game.update(deltaTime);
         game.draw();
         requestAnimationFrame(animate);
    }
    animate(0);
});
