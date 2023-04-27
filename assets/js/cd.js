

const react1 = {x:5,y:5,width:50,height:50}
const react2 = {x:20,y:20,width:10,height:10}

if (react1.x > react2.x +  react2.width &&
    react1.x + react1.width > react2.x &&
    react1.y > react2.y + react2.height &&
    react1.y + react1.width < react2.y
){

}else {

}

const circle1 = {x:10,y:10,radius:300};
const circle2 = {x:500,y:500,radius:300};
let dx = circle2.x - circle1.x;
let dy = circle2.y - circle1.y;

let distance = Math.sqrt(dx * dx + dy *dy)
let sumOfRadii = circle2.radius + circle1.radius;
if (distance < sumOfRadii){

}else {

}