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

finalObject = {
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
      color: "#00FFFF"
    },
    {
      points: [0, 3, 4],
      color: "#FFFF00"
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

function transformfinal(){
  for (let i = 0; i < finalObject.vertices.length; i++) {
    finalObject.vertices[i].mul(50);
    finalObject.vertices[i].add(new Vector(250, 250, 0));
  }
}

function reverseTransformfinal(){
  for (let i = 0; i < finalObject.vertices.length; i++) {
    finalObject.vertices[i].add(new Vector(-250, -250, 0));
    finalObject.vertices[i].mul(1/50);
  }
}

function continueRotationfinal(){
  for (let i = 0; i < finalObject.vertices.length; i++) {
    finalObject.vertices[i].rotateX(-0.01);
    finalObject.vertices[i].rotateZ(-0.01);
  }
}


canvasfinal = document.getElementById('finalCanvas');
ctxfinal = canvasfinal.getContext('2d');

function renderfinal(){
  zBuffer = [];
  for (let i = 0; i < 500*500; i++) {
    zBuffer.push(-1000000);
  }

  for (let i = 0; i < finalObject.faces.length; i++) {
    let face = finalObject.faces[i];


    let p1 = finalObject.vertices[face.points[0]];
    let p2 = finalObject.vertices[face.points[1]];
    let p3 = finalObject.vertices[face.points[2]];

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

            if(0 <= l1 && l1 <= 1 && 0 <= l2 && l2 <= 1 && 0 <= l3 && l3 <= 1){
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
                ctxfinal.fillStyle = finalColor;
                ctxfinal.fillRect(x, y, 1, 1);
              }
            }
        }
      }
    }
  }
}



pausefinal = false;
canvasfinal.addEventListener('click',() =>{pausefinal = !pausefinal}, false);

function loopfinal(){
  if(!pausefinal){
    ctxfinal.clearRect(0, 0, 500, 500);
    transformfinal();
    renderfinal();
    reverseTransformfinal();
    continueRotationfinal();
  }
}

loopfinal();
pausefinal = true;
setInterval(loopfinal, 33);
