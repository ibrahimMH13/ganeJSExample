window.addEventListener('load',()=>{
    const ctx = gCanvas.getContext('2d');
          gCanvas.width = 1400;
          gCanvas.height = 720;
    let enemies = [];
    let score = 0;
    let isGaameOver = false;
    class InputHandler{
        constructor() {
            this.keys =[];
            this.touchY = '';
            this.touchTreshod =30;
            window.addEventListener('keydown',e=>{
                if (( e.key === 'ArrowDown'   ||
                      e.key === 'ArrowUp'     ||
                      e.key === 'ArrowRight'  ||
                      e.key === 'ArrowLeft') && !this.keys.includes(e.key)){
                    this.keys.push(e.key);
                }else if (e.key === 'Enter' && isGaameOver) restartGame();

            });
            window.addEventListener('keyup',e=>{
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowUp'   ||
                    e.key === 'ArrowRight'){
                   this.keys.splice(this.keys.indexOf(e.key),1)
                }
            });
            window.addEventListener('touchstart',(e)=>{
                this.touchY = e.changedTouches[0].pageY;
            })
            window.addEventListener('touchmove',(e)=>{
                const swipeDistance =  this.touchY = e.changedTouches[0].pageY -  this.touchY;
                if (swipeDistance <- this.touchTreshod && !this.keys.includes('swipe up')) this.keys.push('swipe up');
                else if (swipeDistance > this.touchTreshod && !this.keys.includes('swipe down')){
                    this.keys.push('swipe down');
                    console.log(isGaameOver)
                    if (isGaameOver)restartGame();
                }

            })
            window.addEventListener('touchend',(e)=>{
                console.log(this.keys);
               this.keys.splice(this.keys.indexOf('swipe up'),1);
               this.keys.splice(this.keys.indexOf('swipe down'),1);

            })
        }
    }

    class Player{
            constructor(gameWidth,gameHeight) {
                this.gameWidth = gameWidth;
                this.gameHeight = gameHeight;
                this.width = 199;
                this.heigh = 180;
                this.x = 100;
                this.y = this.gameHeight - this.heigh;
                this.image = playerImg;
                this.currentFrameX =0;
                this.currentFrameY =0;
                this.speed = 0;
                this.vy = 0;
                this.weight = 1;
                this.maxFrame =8;
                this.fps=20;
                this.framerTimer=0;
                this.framerIntrvial =1000/this.fps;
                this.speed=0;
            }
            restart(){
                this.x = 100;
                this.y = this.gameHeight - this.heigh;
                this.maxFrame =8;
                this.currentFrameY =0;
            }
            draw(context){
                context.strokeStyle="white";
                context.strokeRect(this.x,this.y,this.width,this.heigh);
                context.beginPath();
                context.arc(this.x + this.width/2,
                            this.y + this.heigh/2,
                        this.width/2,
                    0,
                    Math.PI*2)
                context.stroke();
                context.drawImage(this.image,
                                  this.currentFrameX * this.width,
                                  this.currentFrameY * this.heigh,
                                  this.width,
                                  this.heigh,
                                  this.x,
                                  this.y,
                                  this.width,
                                  this.heigh);
            }
            update(input,deltaTime,enemies){
                enemies.forEach(e=>{
                    const dx = (e.x+e.width/2-20)  - (this.x+this.width/2);
                    const dy = (e.y+e.height/2) - (this.y+this.heigh/2+20);
                    const disitnce = Math.sqrt(dx*dx + dy*dy);
                    if (disitnce < e.width/3+this.width/3){
                        isGaameOver = true;
                    }
                });
                if (this.framerTimer > this.framerIntrvial){
                    if (this.currentFrameX >= this.maxFrame)this.currentFrameX=0;
                    else this.currentFrameX++;
                    this.framerTimer = 0 ;
                }else {
                    this.framerTimer +=deltaTime;
                }
                if (input.keys.includes('ArrowRight')) {
                    this.speed = 5;
                }else if(input.keys.includes('ArrowLeft')){
                    this.speed = -5;
                }else if((input.keys.includes('ArrowUp') || input.keys.includes('swipe up')) && this.#onGround()){
                    this.vy -= 32;
                }else {
                    this.speed = 0;
                }
                //horizontal movement
                this.x+=this.speed;
                if (this.x < 0) this.x =0;
                else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
                //vertical movement
                this.y += this.vy;
                if (!this.#onGround()){
                    this.currentFrameY=1;
                    this.maxFrame = 5;
                    this.vy += this.weight;
                }else {
                    this.vy =0;
                    this.maxFrame=8;
                    this.currentFrameY=0;
                }
                if (this.y > this.gameHeight - this.heigh) {
                    this.y = this.gameHeight -this.heigh;
                }

            }
        #onGround(){
                return this.y >= this.gameHeight - this.heigh;
        }
    }

    class Background{
        constructor(gameWidth,gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = bgImg;
            this.x =0;
            this.y =0;
            this.width = 2400;
            this.height = 720;
            this.speed = 7;
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y,this.width,this.height);
            context.drawImage(this.image,this.x + this.width - this.speed,this.y,this.width,this.height);
        }
        update(){
            this.x -=this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
        restart(){
            this.x =0;
        }
    }

    class Enemy{
        constructor(gameWidth,gameHeight) {
            this.gameWidth  = gameWidth;
            this.gameHeight = gameHeight;
            this.sWidth = 230;
            this.sHeight = 180;
            this.width  = this.sWidth *.5;
            this.height = this.sHeight*.5;
            this.image  = wormImg;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.farmeX =0;
            this.maxFrame = 5;
            this.fps=20;//frame per scaend
            this.frameTimer =0;
            this.markedForDeleteing =false;
            this.frameIntraval =1000/this.fps;
            this.speed= 8;
        }
        draw(context){
            context.strokeStyle="white";
            context.strokeRect(this.x,this.y,this.width,this.height);
            context.beginPath();
            context.arc(this.x + this.width/2,
                this.y + this.height/2,
                this.width/2,
                0,
                Math.PI*2)
            context.stroke();
            context.drawImage(this.image,
                              this.farmeX * this.sWidth,
                              0,
                              this.sWidth,
                              this.sHeight,
                              this.x,
                              this.y,
                              this.width,
                              this.height)
        }

        update(deltaTime){
                if (this.frameTimer > this.frameIntraval){
                    if (this.farmeX  >= this.maxFrame) this.farmeX=0;
                    else  this.farmeX++;
                    this.frameTimer=0;
                }else {
                    this.frameTimer+= deltaTime;
                }
            this.x-= this.speed;
                if (this.x < 0 - this.width){
                    this.markedForDeleteing  = true;
                    score++;
                }
        }
    }
    function toggleFullScreen(){
        if (!document.fullscreenElement){
            gCanvas.requestFullscreen().catch(e=> {
               alert(`Error,cant enable screen mode ${e.message}`);
            });
        }else {
            document.exitFullscreen();
        }
    }
    fullScreenBtn.addEventListener('click',e=>{
        toggleFullScreen();
    });
    function handleEnemies(datatime){
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(gCanvas.width,gCanvas.height));
            enemyTimer =0;
        }else {
            enemyTimer+=datatime;
        }
        enemies.forEach(enemy=>{
            enemy.draw(ctx);
            enemy.update();
        })
        enemies = enemies.filter(enemy=> !enemy.markedForDeleteing);
    }

    function displayStatusText(context){
        context.textAlign="left";
        context.font="40px Helvetica";
        context.fillStyle = "black";
        context.fillText("Score #"+score,20,50);
        context.fillStyle = "white";
        context.fillText("Score #"+score,22,52);
        if (isGaameOver){
            context.textAlign="center";
            context.fillStyle="black";
            context.fillText("GAME OVER, TRY AGAIN!",gCanvas.width/2,200);
            context.fillStyle="white";
            context.fillText("GAME OVER, TRY AGAIN!",gCanvas.width/2+2,202);
        }
    }
    function restartGame(){
        player.restart();
        bg.restart();
        enemies =[];
        score=0;
        isGaameOver=false;
        animate(0);
    }
    function animate(timestamp){
        const deltaTime =timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0,0,gCanvas.width,gCanvas.height)
        bg.draw(ctx);
        bg.update();
        enemy.draw(ctx);
        enemy.update();
        player.draw(ctx);
        player.update(input,deltaTime,enemies);

        displayStatusText(ctx);
        handleEnemies(deltaTime);
        if (!isGaameOver) requestAnimationFrame(animate);
    }
    let lastTime = 0;
    let enemyTimer =0;
    let enemyInterval =1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;
    const input  = new InputHandler();
    const bg     = new Background(gCanvas.width,gCanvas.height);
    const enemy     = new Enemy(gCanvas.width,gCanvas.height);
    const player = new Player(gCanvas.width,gCanvas.height);

    animate(0);

});