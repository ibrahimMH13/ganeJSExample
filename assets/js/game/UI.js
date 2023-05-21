export class UI{
    constructor(game) {
        this.game = game;
        this.fontsize = 50;
        this.fontFamily = "Helvetica";
    }
    draw(context){
        context.font =this.fontsize+'px'+this.fontFamily;
        context.textAlign="left";
        context.fillStyle = this.game.fontColor;
        context.fillText("Score: "+this.game.gameScore,20,50)
    }
}