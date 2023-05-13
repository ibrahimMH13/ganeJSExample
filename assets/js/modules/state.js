export const states ={
    STANDING_LEFT:0,
    STANDING_RIGHT:1,
    SITTING_LEFT:2,
    SITTING_RIGHT:3,
    RUNNING_LEFT:4,
    RUNNING_RIGHT:5,
    JUMPING_LEFT:6,
    JUMPING_RIGHT:7,
    FALLING_LEFT:8,
    FALLING_RIGHT:9,
}
class State{
    constructor(state) {
        this.state = state;
    }
}
export class StandingLeft extends State{
   constructor(player) {
       super('STANDING LEFT');
       this.palyer = player;
   }
   enter(){
       this.palyer.speed = 0;
       this.palyer.currentFrameY = 1;
       this.palyer.maxFrame = 6;

   }
   handleInput(input){
       if (input.trim() === 'PRESS left') this.palyer.setState(states.RUNNING_LEFT);
       if (input.trim() === 'PRESS right') this.palyer.setState(states.RUNNING_RIGHT);
       else if (input.trim() ==='PRESS down') this.palyer.setState(states.SITTING_LEFT);
       else if (input.trim() ==='PRESS up') this.palyer.setState(states.JUMPING_LEFT);
   }
}
export class StandingRight extends State{
   constructor(player) {
       super('STANDING Right');
       this.palyer = player;
   }
   enter(){
        this.palyer.speed = 0;
        this.palyer.currentFrameY = 0;
   }
    handleInput(input){
       if (input.trim() === 'PRESS right')this.palyer.setState(states.RUNNING_RIGHT);
       if (input.trim() === 'PRESS left')this.palyer.setState(states.RUNNING_LEFT);
       else if (input.trim() ==='PRESS down') this.palyer.setState(states.SITTING_RIGHT);
       else if (input.trim() ==='PRESS up') this.palyer.setState(states.JUMPING_RIGHT);

    }
}
export class SittingLeft extends State{
    constructor(player) {
        super('SITTING LEFT');
        this.palyer = player;
    }
    enter(){
        this.palyer.speed = 0;
        this.palyer.currentFrameY = 9;
        this.palyer.maxFrame = 4;
    }
    handleInput(input){
        if (input.trim() === 'PRESS right') this.palyer.setState(states.SITTING_RIGHT);
        else if (input.trim() === 'PRESS up') this.palyer.setState(states.STANDING_LEFT);
    }
}
export class SittingRight extends State{
   constructor(player) {
       super('SITTING Right');
       this.palyer = player;
   }
   enter(){
        this.palyer.speed = 0;
        this.palyer.currentFrameY = 8;
        this.palyer.maxFrame = 4;
   }
    handleInput(input){
       if (input.trim() === 'PRESS left')this.palyer.setState(states.SITTING_LEFT);
       else if (input.trim() === 'PRESS up') this.palyer.setState(states.STANDING_RIGHT);
    }
}
export class RunningLeft extends State{
    constructor(player) {
        super('RUNNING LEFT');
        this.palyer = player;
    }
    enter(){
        this.palyer.currentFrameY = 7;
        this.palyer.speed = -this.palyer.maxSpeed;
        this.palyer.maxFrame = 8;

    }
    handleInput(input){
        if (input.trim() === 'RELEASE left') this.palyer.setState(states.STANDING_LEFT);
        if (input.trim() === 'PRESS right') this.palyer.setState(states.RUNNING_RIGHT);
        else if (input.trim() ==='PRESS down') this.palyer.setState(states.SITTING_LEFT)
    }
}
export class RunningRight extends State{
    constructor(player) {
        super('RUNNING Right');
        this.palyer = player;
    }
    enter(){
        this.palyer.currentFrameY =6;
        this.palyer.speed = this.palyer.maxSpeed;
        this.palyer.maxFrame = 8;

    }
    handleInput(input){
        if (input.trim() === 'RELEASE right')this.palyer.setState(states.STANDING_RIGHT);
        if (input.trim() === 'PRESS left')this.palyer.setState(states.RUNNING_LEFT);
        else if (input.trim() ==='PRESS down') this.palyer.setState(states.SITTING_RIGHT)
    }
}
export class JumpingLeft extends State{
    constructor(player) {
        super('Jumping LEFT');
        this.palyer = player;
    }
    enter(){
        this.palyer.currentFrameY = 3;
        if (this.palyer.onGround())this.palyer.vy -= 40;
        this.palyer.speed = this.palyer.maxSpeed * 0.5;
        this.palyer.maxFrame = 6;
    }
    handleInput(input){
        if (input.trim() === 'PRESS right') this.palyer.setState(states.JUMPING_RIGHT);
        else if (this.palyer.onGround()) this.palyer.setState(states.STANDING_LEFT);
        else if (this.palyer.vy > 0) this.palyer.setState(states.FALLING_LEFT);
    }
}
export class JumpingRight extends State{
    constructor(player) {
        super('Jumping Right');
        this.palyer = player;
    }
    enter(){
        this.palyer.currentFrameY =2;
        if (this.palyer.onGround())this.palyer.vy -= 40;
        this.palyer.speed = this.palyer.maxSpeed * 0.5;
        this.palyer.maxFrame = 6;
    }
    handleInput(input){
        if (input.trim() === 'PRESS left')this.palyer.setState(states.JUMPING_LEFT);
        else if (this.palyer.onGround()) this.palyer.setState(states.STANDING_RIGHT)
        else if (this.palyer.vy > 0) this.palyer.setState(states.FALLING_RIGHT);


    }
}
export class FallingLeft extends State{
    constructor(player) {
        super('Falling Left');
        this.palyer = player;
    }
    enter(){
        this.palyer.currentFrameY =5;
        if (this.palyer.onGround())this.palyer.vy -= 10;
        this.palyer.maxFrame = 6;
    }
    handleInput(input){
        if (input.trim() === 'PRESS left')this.palyer.setState(states.FALLING_RIGHT);
        else if (this.palyer.onGround()) this.palyer.setState(states.STANDING_LEFT);

    }
}

export class FallingRight extends State{
    constructor(player) {
        super('Falling Right');
        this.palyer = player;
    }
    enter(){
        this.palyer.currentFrameY =4;
        if (this.palyer.onGround())this.palyer.vy -= 10;
        this.palyer.maxFrame = 6;
    }
    handleInput(input){
        if (input.trim() === 'PRESS left')this.palyer.setState(states.FALLING_LEFT);
        else if (this.palyer.onGround()) this.palyer.setState(states.STANDING_RIGHT);

    }
}
