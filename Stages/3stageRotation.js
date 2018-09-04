function Vector(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;
}

Vector.prototype.add = function (other) {
  this.x += other.x;
  this.y += other.y;
  this.z += other.z;
};

Vector.prototype.mul = function (scalar) {
  this.x *= scalar;
  this.y *= scalar;
  this.z *= scalar;
};

Vector.prototype.rotateX = function (angle) {
  this.x = this.x;
  this.y = this.y*Math.cos(angle) - this.z*Math.sin(angle);
  this.z = this.y*Math.sin(angle) + this.z*Math.cos(angle);
};

Vector.prototype.rotateY = function (angle) {
  this.x = this.x*Math.cos(angle) + this.z*Math.sin(angle);
  this.y = this.y;
  this.z = -this.x*Math.sin(angle) + this.z*Math.cos(angle);
};

Vector.prototype.rotateZ = function (angle) {
  this.x = this.x*Math.cos(angle) - this.y*Math.sin(angle);
  this.y = this.x*Math.sin(angle) + this.y*Math.cos(angle);
  this.z = this.z;
};

objectRotation = {
  vertices: [
    new Vector(0,-1,0),
    new Vector(1,0,1),
    new Vector(-1,0,1),
    new Vector(-1,0,-1),
    new Vector(1,0,-1)
  ],
  faces: [
    // Sides
    {
      points: [0, 1, 2],
      color: "#FF00FF"
    },
    {
      points: [0, 2, 3],
      color: "#0000FF"
    },
    {
      points: [0, 3, 4],
      color: "#00FF00"
    },
    {
      points: [0, 4, 1],
      color: "#FF0000"
    },
    // Base
    {
      points: [1, 2, 3],
      color: "#AAAAAA"
    },
    {
      points: [4, 1, 3],
      color: "#AAAAAA"
    }
  ]
}


function transformRotation(){
  for (let i = 0; i < objectRotation.vertices.length; i++) {
    objectRotation.vertices[i].mul(50);
    objectRotation.vertices[i].add(new Vector(250, 250, 0));
  }
}

function reverseTransformRotation(){
  for (let i = 0; i < objectRotation.vertices.length; i++) {
    objectRotation.vertices[i].add(new Vector(-250, -250, 0));
    objectRotation.vertices[i].mul(1/50);
  }
}

function continueRotationRotation(){
  for (let i = 0; i < objectRotation.vertices.length; i++) {
    objectRotation.vertices[i].rotateX(-0.005);
    objectRotation.vertices[i].rotateZ(-0.005);
  }
}


canvasRotation = document.getElementById('rotationCanvas');
ctxRotation = canvasRotation.getContext('2d');

function renderRotation(){
  for (let i = 0; i < objectRotation.faces.length; i++) {
    let face = objectRotation.faces[i];
    for (let j = 0; j < face.points.length; j++) {

      let vertex_0 = objectRotation.vertices[face.points[j]];
      let vertex_1 = objectRotation.vertices[face.points[(j+1)%3]];

      // Draw line
      ctxRotation.beginPath();
      ctxRotation.moveTo(vertex_0.x, vertex_0.y);
      ctxRotation.lineTo(vertex_1.x, vertex_1.y);
      ctxRotation.closePath();
      ctxRotation.stroke();
    }
  }
}

pauseRotation = false;
canvasRotation.addEventListener('click',() =>{pauseRotation = !pauseRotation}, false);

function loopRotation(){
  if(!pauseRotation){
    ctxRotation.clearRect(0, 0, 500, 500);
    transformRotation();
    renderRotation();
    reverseTransformRotation();
    continueRotationRotation();
  }
}

loopRotation();

pauseRotation = true;
setInterval(loopRotation, 10);
