export function drawStateText(context,input,player){
    context.font ="30px Helvetica";
    context.fillText('Last input'+ input.lastkey,20,50);
    context.fillText('state '+ player.currentState.state,20,100);
}