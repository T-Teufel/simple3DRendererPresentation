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
Vector.prototype.sub = function (other) {
  this.x -= other.x;
  this.y -= other.y;
  this.z -= other.z;
};
Vector.prototype.mag = function () {
  return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
};
Vector.prototype.norm = function () {
  let length = this.mag();
  this.x /= length;
  this.y /= length;
  this.z /= length;
};
Vector.prototype.cross = function (other) {
  return new Vector(
    this.y*other.z-this.z*other.y,
    this.z*other.x-this.x*other.z,
    this.x*other.y-this.y*other.x
  )
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

object = {
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


function transform(){
  for (let i = 0; i < object.vertices.length; i++) {
    object.vertices[i].mul(50);
    object.vertices[i].add(new Vector(250, 250, 0));
  }
}

function reverseTransform(){
  for (let i = 0; i < object.vertices.length; i++) {
    object.vertices[i].add(new Vector(-250, -250, 0));
    object.vertices[i].mul(1/50);
  }
}

function continueRotation(){
  for (let i = 0; i < object.vertices.length; i++) {
    object.vertices[i].rotateX(-0.01);
    object.vertices[i].rotateZ(-0.01);
  }
}


canvas = document.getElementById('canvasID');
ctx = canvas.getContext('2d');

function render(){

  zBuffer = [];
  for (let i = 0; i < 500*500; i++) {
    zBuffer.push(-1000000);
  }

  for (let i = 0; i < object.faces.length; i++) {
    let face = object.faces[i];

    let p1 = object.vertices[face.points[0]];
    let p2 = object.vertices[face.points[1]];
    let p3 = object.vertices[face.points[2]];

    let xMin = Math.ceil(Math.min(p1.x, p2.x, p3.x));
    let xMax = Math.ceil(Math.max(p1.x, p2.x, p3.x));
    let yMin = Math.ceil(Math.min(p1.y, p2.y, p3.y));
    let yMax = Math.ceil(Math.max(p1.y, p2.y, p3.y));

    let divider = (p2.y-p3.y)*(p1.x-p3.x)+(p3.x-p2.x)*(p1.y-p3.y);

    if(divider != 0){
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            let l1 = ((p2.y-p3.y)*(x-p3.x)+(p3.x-p2.x)*(y-p3.y))/divider;
            let l2 = ((p3.y-p1.y)*(x-p3.x)+(p1.x-p3.x)*(y-p3.y))/divider;
            let l3 = 1-l1-l2;

            if(0 <= l1 && 0 <= l2 && 0 <= l3){
              let zIndex = Math.trunc(y*500+x);
              let depth = l1*p1.z + l2*p2.z + l3*p3.z;

              if(depth > zBuffer[zIndex]){
                zBuffer[zIndex] = depth;

                let finalColor = "#";

                let e1 = new Vector(p2.x, p2.y, p2.z);
                let e2 = new Vector(p3.x, p3.y, p3.z);

                e1.sub(p1);
                e2.sub(p1);

                let cross = e1.cross(e2);
                cross.norm();

                let shade = Math.abs(cross.z);

                for (let j = 0; j < 3; j++) {
                  let value = parseInt(face.color.substring(2*j+1, 2*j+3), 16);
                  value = Math.ceil(value*shade)

                  let add = (value).toString(16);
                  while(add.length < 2){
                    add = "0"+add;
                  }
                  finalColor+=add;
                }
                ctx.fillStyle = finalColor;
                ctx.fillRect(x, y, 1, 1);
              }
            }
        }
      }
    }
  }
}


pause = false;
canvas.addEventListener('click',() =>{pause = !pause}, false);

function loop(){
  if(!pause){
    ctx.clearRect(0, 0, 500, 500);
    transform();
    render();
    reverseTransform();
    continueRotation();
  }
}

loop();
pause = true;
setInterval(loop, 33);
