function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function Animation(canvasId){
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext('2d');
  this.animationCount = 0;
  this.steps = [];

  this.animating = false;
  this.canvas.addEventListener('click',()=>{this.advance()}, false);
}

Animation.prototype.advance = function () {
  if(!this.animating){
    this.animating = true;

    this.steps[this.animationCount](this.context).then(()=>{this.animating = false;})
    this.animationCount = (this.animationCount+1)%this.steps.length;
  }
};

Animation.prototype.addStep = function (animaFunc) {

  this.steps.push(animaFunc);
};


async function draw2DSystem(context){
  context.save();
  context.translate(100, 400);

  context.lineCap="round";
  context.font = "10px Arial";
  context.textAlign = "center";

  context.beginPath();

  // Y Axis
  context.moveTo(0, 20);
  context.lineTo(0, -350);

  // Arrow
  context.lineTo(-5, -340);
  context.lineTo(5, -340);
  context.lineTo(0, -350);

  for (let i = 1; i <= 16; i++) {
    context.moveTo(-4, -i*20);
    context.lineTo(4, -i*20);

    context.fillText(""+i,-14, -i*20+4);
  }

  // X Axis
  context.moveTo(-20, 0);
  context.lineTo(350, 0);

  // Arrow
  context.lineTo(340, -5);
  context.lineTo(340, 5);
  context.lineTo(350, 0);


  for (let i = 1; i <= 16; i++) {
    context.moveTo(i*20, -4);
    context.lineTo(i*20, 4);

    context.fillText(""+i,i*20, 14);
  }

  context.font = "15px Arial";
  context.fillText("X",360, 5);
  context.fillText("Y",0, -360);

  context.closePath();
  context.stroke();
  context.restore();
}

async function draw3DSystem(context){
  context.save();
  draw2DSystem(context);
  context.translate(100, 400);

  context.beginPath();
  context.moveTo(10, -10);
  context.lineTo(-80, 80);

  context.lineTo(-70, 80);
  context.lineTo(-80, 70);
  context.lineTo(-80, 80);

  context.font = "10px Arial";
  context.textAlign = "center";
  // Marks

  for (let i = 1; i <= 6; i++) {


    context.moveTo(-10*i, 10*i-4);
    context.lineTo(-10*i, 10*i+4);

    context.fillText(""+i,-10*i, 10*i+12);

  }

  context.font = "15px Arial";
  context.fillText("Z",-90, 90);

  context.moveTo(10, -10);
  context.closePath();
  context.stroke();
  context.restore();
}

async function draw2DPoint(context){
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.fillRect(180-2, -240+2, 4, 4);
  context.fillText("P (9.0; 12.0)",182, -242)
  context.restore();
}

async function animate2DVector(context){
  for (let i = 0; i < 100; i++) {
    context.clearRect(0,0,500,500);
    draw2DSystem(context);
    context.save();

    context.translate(100, 400);
    context.strokeStyle = "#FF0000"

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(i*1.8,i*(-2.36));

    context.lineTo(i*1.8-6,i*(-2.36));
    context.moveTo(i*1.8,i*(-2.36));
    context.lineTo(i*1.8,i*(-2.36)+6);
    context.moveTo(0,0);

    context.closePath();

    context.stroke();
    context.restore();

    draw2DPoint(context);
    await sleep(5)
  }
  context.save();
  context.translate(100, 400);
  context.font = "14px Arial";
  context.fillText("0P(9.0; 12.0)",90, -90)
  context.restore();

}

async function clear2DVector(context){
    context.clearRect(0,0,500,500);
    draw2DSystem(context);
    draw2DPoint(context);

}

async function draw3DPoint(context){
  // Draws a Point at 9;12;0
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.fillRect(180-2, -240+2, 4, 4);
  context.fillText("P (9.0; 12.0; 0.0)",182, -242)
  context.restore();
}



async function animateZAxis(context){
  context.save();
  context.lineCap="round";


  // Line
  for (let i = -10; i < 80; i++) {
    context.clearRect(-0,-0,500,500);
    draw2DSystem(context);
    draw2DPoint(context);

    context.save();
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(10, -10);
    context.lineTo(-i-1, i+1);
    context.moveTo(10, -10);
    context.closePath();
    context.stroke();
    context.restore()
    await sleep(10);
  }

  // Arrow 1
  for (let i = 1; i <= 10; i++) {
    context.clearRect(-0,-0,500,500);
    draw2DSystem(context);
    draw2DPoint(context);

    context.save();
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(10, -10);
    context.lineTo(-80, 80);

    context.lineTo(-80, 80-i);

    context.moveTo(10, -10);
    context.closePath();
    context.stroke();
    context.restore()

    await sleep(10);
  }

  // Arrow 2
  for (let i = 1; i <= 10; i++) {
    context.clearRect(-0,-0,500,500);
    draw2DSystem(context);
    draw2DPoint(context);

    context.save();
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(10, -10);
    context.lineTo(-80, 80);
    context.lineTo(-80, 70);
    context.lineTo(-80+i, 70+i);

    context.moveTo(10, -10);
    context.closePath();
    context.stroke();
    context.restore()

    await sleep(10);
  }

  // Arrow 3
  for (let i = 1; i <= 10; i++) {
    context.clearRect(-0,-0,500,500);
    draw2DSystem(context);
    draw2DPoint(context);

    context.save();
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(10, -10);
    context.lineTo(-80, 80);
    context.lineTo(-80, 70);
    context.lineTo(-70, 80);
    context.lineTo(-70-i, 80);
    context.moveTo(10, -10);
    context.closePath();
    context.stroke();
    context.restore()

    await sleep(10);
  }


  context.font = "10px Arial";
  context.textAlign = "center";
  // Marks
  for (let i = 1; i <= 6; i++) {
    context.save();
    context.translate(100, 400);

    context.beginPath();
    context.moveTo(-10*i, 10*i-4);
    context.lineTo(-10*i, 10*i+4);
    context.moveTo(10, -10);
    context.closePath();

    context.fillText(""+i,-10*i, 10*i+12);


    context.stroke();
    context.restore()

    await sleep(100);
  }
  context.translate(100, 400);

  context.font = "15px Arial";
  context.fillText("Z",-90, 90);
  context.restore();
}

async function changePointTo3D(context){
  context.save();
  context.clearRect(0,0,500,500);
  draw3DSystem(context);
  draw3DPoint(context);
  context.restore();
}

async function move3DPoint(context){
  for (let i = 0; i <= 100; i++) {
    context.clearRect(0,0,500,500);
    draw3DSystem(context);

    context.save();
    context.font = "14px Arial";
    context.translate(100, 400);

    context.fillRect(180-2-i*0.5, -240+2+i*0.5, 4, 4);
    context.fillText("P (9.0; 12.0; "+i*5/100+")",182-i*0.5, -242+i*0.5)

    context.restore();

    await sleep(10);
  }
}

async function vectorInitial(context){
  context.clearRect(0,0,500,500);
  draw2DSystem(context);
}


vectorAnimation = new Animation('vectorAnimationCanvas');
vectorAnimation.addStep(vectorInitial);
vectorAnimation.addStep(draw2DPoint);
vectorAnimation.addStep(animateZAxis);
vectorAnimation.addStep(changePointTo3D);
vectorAnimation.addStep(move3DPoint);

vectorAnimation.advance();

async function drawMoved3DPoint(context){
  // Draws a Point at 9;12;5
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.fillRect(180-2-50, -240+2+50, 4, 4);
  context.fillText("P (9.0; 12.0; 5.0)",182-50, -242+50)
  context.restore();
}

async function projectionInitial(context){
  context.clearRect(0,0,500,500);
  draw3DSystem(context);
  drawMoved3DPoint(context);
}

async function drawColoredScreen(context){
  context.clearRect(0,0,500,500);
  context.save();
  context.translate(100, 400);
  context.fillStyle = "#E0FFFF";
  context.fillRect(0, 0, 350, -350);
  context.restore();
  draw3DSystem(context);
  drawMoved3DPoint(context);
}

async function projectPoint(context){
  for (let i = 0; i <= 100; i++) {
    context.clearRect(0,0,500,500);

    context.save();
    context.translate(100, 400);
    context.fillStyle = "#E0FFFF";
    context.fillRect(0, 0, 350, -350);
    context.restore();

    draw3DSystem(context);

    context.save();
    context.font = "14px Arial";
    context.translate(100, 400);

    context.fillRect(180-2-50+i*0.5, -240+2+50-i*0.5, 4, 4);
    context.fillText("P (9.0; 12.0; "+(5.0-i*5/100).toFixed(1)+")",182-50+i*0.5, -242+50-i*0.5)

    context.restore();

    await sleep(10);
  }

}


projectionAnimation = new Animation('projectionAnimationCanvas');
projectionAnimation.addStep(projectionInitial);
projectionAnimation.addStep(drawColoredScreen);
projectionAnimation.addStep(projectPoint);

projectionAnimation.advance();

async function transformationsInitial(context){
  context.clearRect(0,0,500,500);
  draw2DSystem(context);
  draw2DVector(context);
}

async function draw2DVector(context){
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(60,-60);

  context.lineTo(55,-60);
  context.moveTo(60,-60);
  context.lineTo(60,-55);
  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("P (3.0; 3.0)",62, -42)
  context.restore();
}

async function draw2DBox(context){
  context.clearRect(0,0,500,500);
  draw2DSystem(context);
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(60,-60);

  context.lineTo(55,-60);
  context.moveTo(60,-60);
  context.lineTo(60,-55);

  context.moveTo(60,-60);
  context.lineTo(0,-60);

  context.moveTo(60,-60);
  context.lineTo(60,0);

  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("P (3.0; 3.0)",62, -42)
  context.restore();
}

async function animateVectorScaling(context){
  for (let i = 0; i <= 60; i++) {

    context.clearRect(0,0, 500, 500)
    draw2DSystem(context);
    context.save();

    context.font = "14px Arial";
    context.translate(100, 400);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(60+i,-60-i);
    context.lineTo(55+i,-60-i);
    context.moveTo(60+i,-60-i);
    context.lineTo(60+i,-55-i);
    context.moveTo(0,0);
    context.closePath();
    context.stroke();

    let coor = ((60+i)/20).toFixed(1);
    context.fillText("P ("+coor+"; "+coor+")",62+i, -42-i)


    context.restore();
    await sleep(10);
  }
  context.clearRect(0,0, 500, 500)
  draw2DSystem(context);
  context.save();

  context.font = "14px Arial";
  context.translate(100, 400);

  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(120,-120);
  context.lineTo(115,-120);
  context.moveTo(120,-120);
  context.lineTo(120,-115);
  context.moveTo(0,0);
  context.closePath();

  context.fillText("P (6.0; 6.0)",122, -102)
  context.stroke();

  context.restore();

}

async function animate2DBox(context){
  for (let i = 0; i <= 60; i++) {

    context.clearRect(0,0, 500, 500)
    draw2DSystem(context);
    context.save();

    context.font = "14px Arial";
    context.translate(100, 400);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(60+i,-60-i);
    context.lineTo(55+i,-60-i);
    context.moveTo(60+i,-60-i);
    context.lineTo(60+i,-55-i);

    context.moveTo(60+i,-60-i);
    context.lineTo(60+i,0);

    context.moveTo(60+i,-60-i);
    context.lineTo(0,-60-i);


    context.moveTo(0,0);
    context.closePath();
    context.stroke();

    let coor = ((60+i)/20).toFixed(1);
    context.fillText("P ("+coor+"; "+coor+")",62+i, -42-i)

    context.restore();
    await sleep(10);
  }
  context.clearRect(0,0, 500, 500)
  draw2DSystem(context);
  context.save();

  context.font = "14px Arial";
  context.translate(100, 400);

  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(120,-120);
  context.lineTo(115,-120);
  context.moveTo(120,-120);
  context.lineTo(120,-115);

  context.moveTo(120,-120);
  context.lineTo(120,0);

  context.moveTo(120,-120);
  context.lineTo(0,-120);

  context.moveTo(0,0);
  context.closePath();

  context.fillText("P (6.0; 6.0)",122, -102)
  context.stroke();

  context.restore();

}

async function drawTranslationVector(context){
  context.save();
  context.font = "14px Arial";
  context.strokeStyle = "#FF0000"
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(60,-60);
  context.lineTo(260,-60);

  context.lineTo(257,-60+3);
  context.moveTo(260,-60);
  context.lineTo(257,-60-3);
  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("T (10.0; 0.0)",262, -62)
  context.restore();

}

async function animateTranslationVector(context){
  for (let i = 0; i <= 200; i++) {
    context.clearRect(0,0,500,500);
    draw2DSystem(context);
    draw2DVector(context);

    context.save();
    context.font = "14px Arial";
    context.strokeStyle = "#FF0000"
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(60,-60);
    context.lineTo(60+i,-60);

    context.lineTo(57+i,-60+3);
    context.moveTo(60+i,-60);
    context.lineTo(57+i,-60-3);
    context.moveTo(0,0);

    context.closePath();
    context.stroke();
    context.fillText("T ("+ (i/20).toFixed(1)+ "; 0.0)",62+i, -62)
    context.restore();

    await sleep(5);
  }
  context.clearRect(0,0,500,500);
  draw2DSystem(context);
  draw2DVector(context);
  drawTranslationVector(context);

}

async function animateTranslatedVector(context){
  for (let i = 0; i <= 100; i++) {
    context.clearRect(0,0,500,500);
    draw2DSystem(context);
    draw2DVector(context);
    drawTranslationVector(context);

    context.save();
    let x = Math.trunc(i*2.6);
    let y = -Math.trunc(i*0.6);

    context.font = "14px Arial";
    context.strokeStyle = "#0000FF"
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(0,0);

    context.lineTo(x,y);

    context.lineTo(x-5,y-3);
    context.moveTo(x,y);
    context.lineTo(x-3,y+5);
    context.moveTo(0,0);

    context.closePath();
    context.stroke();

    context.fillText("P' ("+(x/20).toFixed(1)+"; "+(-y/20).toFixed(1)+")",132, -16)
    context.restore();

    await sleep(10);
  }
  context.clearRect(0,0,500,500);
  draw2DSystem(context);
  draw2DVector(context);
  drawTranslationVector(context);


  context.save();
  context.font = "14px Arial";
  context.strokeStyle = "#0000FF"
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(0,-0);
  context.lineTo(260,-60);

  context.lineTo(255,-63);
  context.moveTo(260,-60);
  context.lineTo(257,-55);
  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("P' (13.0; 3.0)",132, -16)
  context.restore();
}

translationAnimation = new Animation('translationAnimationCanvas');
translationAnimation.addStep(transformationsInitial);
translationAnimation.addStep(animateTranslationVector);
translationAnimation.addStep(animateTranslatedVector);

translationAnimation.advance();

scalingAnimation = new Animation('scalingAnimationCanvas');
scalingAnimation.addStep(transformationsInitial);
scalingAnimation.addStep(animateVectorScaling);
scalingAnimation.addStep(draw2DBox);
scalingAnimation.addStep(animate2DBox);

scalingAnimation.advance();

async function drawCubeWire(context){

  context.save();

  context.beginPath();
  context.moveTo(150, 150);
  context.lineTo(350, 150);
  context.lineTo(350, 350);
  context.lineTo(150, 350);
  context.lineTo(150, 150);

  context.lineTo(200, 200);
  context.lineTo(400, 200);
  context.lineTo(400, 400);
  context.lineTo(200, 400);
  context.lineTo(200, 200);

  context.moveTo(350, 150);
  context.lineTo(400, 200);

  context.moveTo(350, 350);
  context.lineTo(400, 400);

  context.moveTo(150, 350);
  context.lineTo(200, 400);


  context.moveTo(0,0);
  context.closePath();

  context.stroke();

  context.restore();

}

async function fillCube(context){
  context.save();


  context.fillStyle = "#0000FF"
  context.beginPath();
  context.moveTo(150, 150);
  context.lineTo(350, 150);
  context.lineTo(350, 350);
  context.lineTo(150, 350);
  context.lineTo(150, 150);
  context.moveTo(0,0);
  context.closePath();
  context.fill();

  context.fillStyle = "#FF0000"
  context.beginPath();
  context.moveTo(350, 150);
  context.lineTo(400, 200);
  context.lineTo(400, 400);
  context.lineTo(350, 350);
  context.lineTo(350, 150);
  context.moveTo(0,0);
  context.closePath();
  context.fill();

  context.fillStyle = "#00FF00"
  context.beginPath();
  context.moveTo(150, 350);
  context.lineTo(350, 350);
  context.lineTo(400, 400);
  context.lineTo(200, 400);
  context.lineTo(150, 350);
  context.moveTo(0,0);
  context.closePath();
  context.fill();

  context.restore();

}

async function wireframeInitial(context){
  context.clearRect(0,0,500,500);
  fillCube(context);
}

async function cutToWireframe(context){
  context.clearRect(0,0,500,500);
  drawCubeWire(context);
}

wireframeAnimation = new Animation('wireframeAnimationCanvas');
wireframeAnimation.addStep(wireframeInitial);
wireframeAnimation.addStep(cutToWireframe);

wireframeAnimation.advance();

async function rotation2DInitial(context){
  context.clearRect(0,0,500,500);
  draw2DSystem(context);
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(60,-60);

  context.lineTo(55,-60);
  context.moveTo(60,-60);
  context.lineTo(60,-55);
  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("P (3.0; 3.0)",62, -72)
  context.restore();
}

async function animateRotation2D(context){
  let end = 45;
  for (let i = 0; i <= end; i+=0.5) {
    context.clearRect(0,0, 500, 500)
    draw2DSystem(context);
    context.save();
    context.translate(100, 400);
    context.font = "14px Arial";
    let angle = i*Math.PI/180

    let x = ((Math.cos(-angle)-Math.sin(-angle))*3).toFixed(1);
    let y = ((Math.cos(-angle)+Math.sin(-angle))*3).toFixed(1);
    context.fillText("P ("+x+"; "+y+")",x*20+2, -y*20-12)

    context.rotate(angle);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(60,-60);
    context.lineTo(55,-60);
    context.moveTo(60,-60);
    context.lineTo(60,-55);
    context.moveTo(0,0);
    context.closePath();
    context.stroke();


    context.restore();
    await sleep(10);
  }
  context.clearRect(0,0, 500, 500)
  draw2DSystem(context);
  context.save();
  context.translate(100, 400);
  context.font = "14px Arial";
  let angle = end*Math.PI/180



  let x = ((Math.cos(-angle)-Math.sin(-angle))*3).toFixed(1);
  let y = ((Math.cos(-angle)+Math.sin(-angle))*3).toFixed(1);
  context.fillText("P ("+x+"; "+y+")",x*20+2, -y*20-12)

  context.rotate(angle);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(60,-60);
  context.lineTo(55,-60);
  context.moveTo(60,-60);
  context.lineTo(60,-55);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();


  context.restore();
}


rotation2DAnimation = new Animation('rotation2DAnimationCanvas');
rotation2DAnimation.addStep(rotation2DInitial);
rotation2DAnimation.addStep(animateRotation2D);
rotation2DAnimation.advance();

async function rotation3DInitial(context){
  context.clearRect(0,0,500,500);
  draw3DSystem(context);
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(10,-10);

  context.lineTo(5,-12);
  context.moveTo(10,-10);
  context.lineTo(10,-5);
  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("P (3.0; 3.0; 5.0)",12, -22)
  context.restore();
}

async function moveIntoXY(context){
  for (let i = 0; i <= 50; i++) {
    context.clearRect(0,0,500,500);
    draw3DSystem(context);
    context.save();
    context.font = "14px Arial";
    context.translate(100, 400);
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(10+i,-10-i);

    context.lineTo(5+i,-12-i+i/15);
    context.moveTo(10+i,-10-i);
    context.lineTo(10+i,-5-i);
    context.moveTo(0,0);

    context.closePath();
    context.stroke();
    context.fillText("P (3.0; 3.0; "+((50-i)/10).toFixed(1)+")",12+i, -22-i)
    context.restore();
    await sleep(20);
  }
  context.clearRect(0,0,500,500);
  draw3DSystem(context);
  context.save();
  context.font = "14px Arial";
  context.translate(100, 400);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(60,-60);

  context.lineTo(55,-60);
  context.moveTo(60,-60);
  context.lineTo(60,-55);
  context.moveTo(0,0);

  context.closePath();
  context.stroke();
  context.fillText("P (3.0; 3.0; 0.0)",60, -72)
  context.restore();
}

async function rotateInXY(context){
  let end = 45;
  for (let i = 0; i <= end; i+=0.5) {
    context.clearRect(0,0, 500, 500)
    draw3DSystem(context);
    context.save();
    context.translate(100, 400);
    context.font = "14px Arial";
    let angle = i*Math.PI/180

    let x = ((Math.cos(-angle)-Math.sin(-angle))*3).toFixed(1);
    let y = ((Math.cos(-angle)+Math.sin(-angle))*3).toFixed(1);
    context.fillText("P ("+x+"; "+y+"; 0.0)",x*20+2, -y*20-12)

    context.rotate(angle);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(60,-60);
    context.lineTo(55,-60);
    context.moveTo(60,-60);
    context.lineTo(60,-55);
    context.moveTo(0,0);
    context.closePath();
    context.stroke();


    context.restore();
    await sleep(10);
  }
  context.clearRect(0,0, 500, 500)
  draw3DSystem(context);
  context.save();
  context.translate(100, 400);
  context.font = "14px Arial";
  let angle = end*Math.PI/180



  let x = ((Math.cos(-angle)-Math.sin(-angle))*3).toFixed(1);
  let y = ((Math.cos(-angle)+Math.sin(-angle))*3).toFixed(1);
  context.fillText("P ("+x+"; "+y+"; 0.0)",x*20+2, -y*20-12)

  context.rotate(angle);
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(60,-60);
  context.lineTo(55,-60);
  context.moveTo(60,-60);
  context.lineTo(60,-55);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();


  context.restore();
}

async function resetZ(context){
  for (let i = 0; i <= 50; i++) {
    context.clearRect(0,0,500,500);
    draw3DSystem(context);
    context.save();
    context.font = "14px Arial";
    context.translate(100, 400);

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(84-i,+i);

    context.lineTo(79-i+(i/8), +i-4);
    context.moveTo(84-i,+i);
    context.lineTo(79-i, +i+4-(i/10));
    context.moveTo(0,0);

    context.closePath();
    context.stroke();
    context.fillText("P (4.2; 0.0; "+(i/10).toFixed(1)+")",86-i, i-10)
    context.restore();
    await sleep(20);
  }
}

async function rotateAroundZAxis(context){
  let end = 45;
  for (let i = 0; i <= end; i+=0.5) {
    context.clearRect(0,0, 500, 500)
    draw3DSystem(context);
    context.save();
    context.translate(100, 400);
    context.font = "14px Arial";
    let angle = i*Math.PI/180

    let x = (Math.cos(angle)*4.2).toFixed(1);
    let y = (Math.sin(angle)*4.2).toFixed(1);

    context.fillText("P ("+x+"; "+y+"; 5.0)",x*20-50+2, -y*20+50-12)

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(x*20-50,-y*20+50);


    context.lineTo(x*20-50+1*((end-i)/end)-5*(i/end),
                  -y*20+50-4*((end-i)/end)-2*(i/end));

    context.moveTo(x*20-50,-y*20+50);
    context.lineTo(x*20-50-5*((end-i)/end),
                  -y*20+50-1*((end-i)/end)+5*(i/end));


    context.closePath();
    context.stroke();


    context.restore();
    await sleep(10);
  }
}

rotation3DAnimation = new Animation('rotation3DAnimationCanvas');
rotation3DAnimation.addStep(rotation3DInitial);
rotation3DAnimation.addStep(moveIntoXY);
rotation3DAnimation.addStep(rotateInXY);
rotation3DAnimation.addStep(resetZ);
rotation3DAnimation.addStep(rotateAroundZAxis);
rotation3DAnimation.advance();

function getMousePos (canvas, evt) {
  // Hardcoded for specific spreadsheet
  return {
    x: (evt.clientX-(window.innerWidth-662)/2)*500/662,
    y: (evt.clientY-(window.innerHeight-662)/2-70)*500/662
  };
}

async function barycentricCoordinatesDemo(canvasID) {
  let canvas = document.getElementById(canvasID);
  let context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(150, 150);
  context.lineTo(350, 200);
  context.lineTo(250, 300);
  context.lineTo(150, 150);
  context.closePath();
  context.stroke();
  canvas.addEventListener('mousemove', function (evt){
    let mousePos = getMousePos(canvas, evt);
    context.clearRect(0,0,500,500);
    context.save();
    context.font = "14px Arial";

    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(350, 200);
    context.lineTo(250, 300);
    context.lineTo(150, 150);
    context.closePath();
    context.stroke();

    let x = mousePos.x.toFixed(0);
    let y = mousePos.y.toFixed(0);

    let l1 = (150*(x-150)-100*(y-150))/25000;
    let l2 = (-50*(x-150)+200*(y-150))/25000;
    let l3 = 1-l1-l2;

    l1 = l1.toFixed(2);
    l2 = l2.toFixed(2);
    l3 = l3.toFixed(2);

    context.fillText("P ("+x+"; "+y+")",
                    mousePos.x+5, mousePos.y-25);

    context.fillText("B ("+l1+"; "+l2+"; "+l3+")",
                    mousePos.x+5, mousePos.y-5);

    context.fillStyle = "#FF0000"
    context.fillRect(mousePos.x-2, mousePos.y-2, 4, 4);

    context.restore();

  })
}

barycentricCoordinatesDemo('barycentricCoordinatesCanvas');

async function drawVectorTriangle(context){
  context.save();
  context.translate(100, 400);

  // P1(12, -1, 2)
  // P2(2, 0, 2)
  // P3(12, -1, 5)

  let P1 = {x: 220, y: 40};
  let P2 = {x: 20, y: 20};
  let P3 = {x: 190, y: 70};

  context.beginPath();
  context.moveTo(P2.x, P2.y);
  context.lineTo(P3.x, P3.y);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();

  context.strokeStyle = "#0000FF";

  context.beginPath();
  context.moveTo(P1.x, P1.y);
  context.lineTo(P2.x, P2.y);
  context.lineTo(P2.x+5,P2.y-4);
  context.moveTo(P2.x, P2.y);
  context.lineTo(P2.x+5,P2.y+5);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();

  context.beginPath();
  context.moveTo(P1.x, P1.y);
  context.lineTo(P3.x, P3.y);
  context.lineTo(P3.x,P3.y-5);
  context.moveTo(P3.x, P3.y);
  context.lineTo(P3.x+9,P3.y-4);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();



  context.restore();
}

async function normalVectorInitial(context){
  context.clearRect(0,0,500,500);
  draw3DSystem(context);
  drawVectorTriangle(context);
}

async function animateNormalVector(context){
  let P1 = {x: 220, y: 40};
  let normalUnscaled = {x: 1, y:10, z:0};

  for (let i = 0; i <= 100; i++) {

    let N = {x: P1.x+(normalUnscaled.x*i/100*20+normalUnscaled.z*i/100*10),
             y: P1.y+(-normalUnscaled.y*i/100*20-normalUnscaled.z*i/100*10)}

    context.clearRect(0,0,500,500);
    draw3DSystem(context);
    drawVectorTriangle(context);

    context.save();
    context.translate(100, 400);
    context.strokeStyle = "#FF0000";

    context.beginPath();
    context.moveTo(P1.x, P1.y);
    context.lineTo(N.x, N.y);
    context.lineTo(N.x-4, N.y+4);
    context.moveTo(N.x, N.y);
    context.lineTo(N.x+3, N.y+4);
    context.moveTo(0,0);
    context.closePath();
    context.stroke();

    context.restore();
    await sleep(10);
  }
}

async function drawTriangleNormalVector(context){
  let N = {x: 240, y: -160}

  context.save();
  context.translate(100, 400);
  context.strokeStyle = "#FF0000";

  context.beginPath();
  context.moveTo(220, 40);
  context.lineTo(N.x, N.y);
  context.lineTo(N.x-4, N.y+4);
  context.moveTo(N.x, N.y);
  context.lineTo(N.x+3, N.y+4);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();

  context.restore();
}

async function animateLightRay(context){
  for (let i = 0; i <= 440; i++) {
    context.clearRect(0,0,500,500);
    draw3DSystem(context);
    drawVectorTriangle(context);
    drawTriangleNormalVector(context);

    context.save();
    context.strokeStyle = "#FF8C00";

    context.beginPath();
    context.moveTo(320, 0);
    context.lineTo(320, i);
    context.lineTo(315, i-5);
    context.moveTo(320, i);
    context.lineTo(325, i-5);
    context.moveTo(0,0);
    context.closePath();
    context.stroke();

    context.restore();
    await sleep(2);
  }
}

async function drawLightRay(context){

  context.save();
  context.strokeStyle = "#FF8C00";

  context.beginPath();
  context.moveTo(320, 0);
  context.lineTo(320, 440);
  context.lineTo(315, 440-5);
  context.moveTo(320, 440);
  context.lineTo(325, 440-5);
  context.moveTo(0,0);
  context.closePath();
  context.stroke();

  context.restore();
}

async function animateAngle(context){
  let B = {x:221, y:-60};
  context.clearRect(0,0,500,500);
  draw3DSystem(context);
  drawVectorTriangle(context);
  drawTriangleNormalVector(context);
  drawLightRay(context);

  let precision = 20;
  let length = 8;
  let height = 2;

  for (let i = 0; i <= precision; i++) {

    let delta = length*i/precision;

    context.save();
    context.translate(100, 400);

    context.fillRect(B.x+delta, B.y-height*Math.sin(delta*Math.PI/length), 1, 1);

    context.restore();
    await sleep(10);
  }
  context.save();
  context.textAlign = "center";
  context.translate(100, 400);
  context.fillText("a", B.x+length/2, B.y-4)
  context.restore();
}

normalVectorAnimation = new Animation('normalVectorAnimationCanvas');

normalVectorAnimation.addStep(normalVectorInitial);
normalVectorAnimation.addStep(animateNormalVector);
normalVectorAnimation.addStep(animateLightRay);
normalVectorAnimation.addStep(animateAngle);


normalVectorAnimation.advance();
