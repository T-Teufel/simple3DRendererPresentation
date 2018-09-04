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

objectRasterization = {
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


function transformRasterization(){
  for (let i = 0; i < objectRasterization.vertices.length; i++) {
    objectRasterization.vertices[i].mul(50);
    objectRasterization.vertices[i].add(new Vector(250, 250, 0));
  }
}

function reverseTransformRasterization(){
  for (let i = 0; i < objectRasterization.vertices.length; i++) {
    objectRasterization.vertices[i].add(new Vector(-250, -250, 0));
    objectRasterization.vertices[i].mul(1/50);
  }
}

function continueRotationRasterization(){
  for (let i = 0; i < objectRasterization.vertices.length; i++) {
    objectRasterization.vertices[i].rotateX(-0.005);
    objectRasterization.vertices[i].rotateZ(-0.005);
  }
}


canvasRasterization = document.getElementById('rasterizationCanvas');
ctxRasterization = canvasRasterization.getContext('2d');

function renderRasterization(){
  for (let i = 0; i < objectRasterization.faces.length; i++) {
    let face = objectRasterization.faces[i];
    ctxRasterization.fillStyle = face.color;

    let p1 = objectRasterization.vertices[face.points[0]];
    let p2 = objectRasterization.vertices[face.points[1]];
    let p3 = objectRasterization.vertices[face.points[2]];

    let xMin = Math.floor(Math.min(p1.x, p2.x, p3.x));
    let xMax = Math.ceil(Math.max(p1.x, p2.x, p3.x));
    let yMin = Math.floor(Math.min(p1.y, p2.y, p3.y));
    let yMax = Math.ceil(Math.max(p1.y, p2.y, p3.y));

    let divider = (p2.y-p3.y)*(p1.x-p3.x)+(p3.x-p2.x)*(p1.y-p3.y);

    if(divider != 0){
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            let l1 = ((p2.y-p3.y)*(x-p3.x)+(p3.x-p2.x)*(y-p3.y))/divider;
            let l2 = ((p3.y-p1.y)*(x-p3.x)+(p1.x-p3.x)*(y-p3.y))/divider;
            let l3 = 1-l1-l2;
            if(0 <= l1 && 0 <= l2 && 0 <= l3){
              ctxRasterization.fillRect(x, y, 1, 1);
            }
        }
      }
    }
  }
}



pauseRasterization = false;
canvasRasterization.addEventListener('click',() =>{pauseRasterization = !pauseRasterization}, false);

function loopRasterization(){
  if(!pauseRasterization){
    ctxRasterization.clearRect(0, 0, 500, 500);
    transformRasterization();
    renderRasterization();
    reverseTransformRasterization();
    continueRotationRasterization();
  }
}

loopRasterization();
pauseRasterization = true;
setInterval(loopRasterization, 10);
