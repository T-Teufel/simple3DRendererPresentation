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

EdgeObject = {
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
      edges: [0,1,2],
      color: "#FF00FF"
    },
    {
      points: [0, 2, 3],
      edges: [0,1,2],
      color: "#00FFFF"
    },
    {
      points: [0, 3, 4],
      edges: [0,1,2],
      color: "#FFFF00"
    },
    {
      points: [0, 4, 1],
      edges: [0,1,2],
      color: "#FF0000"
    },
    // Base
    {
      points: [1, 2, 3],
      edges: [0,2],
      color: "#AAAAAA"
    },
    {
      points: [3, 4, 1],
      edges: [0,2],
      color: "#AAAAAA"
    }
  ]
}

function transformEdge(){
  for (let i = 0; i < EdgeObject.vertices.length; i++) {
    EdgeObject.vertices[i].mul(70);
    EdgeObject.vertices[i].add(new Vector(250, 250, 0));
  }
}

function reverseTransformEdge(){
  for (let i = 0; i < EdgeObject.vertices.length; i++) {
    EdgeObject.vertices[i].add(new Vector(-250, -250, 0));
    EdgeObject.vertices[i].mul(1/70);
  }
}

function continueRotationEdge(){
  for (let i = 0; i < EdgeObject.vertices.length; i++) {
    EdgeObject.vertices[i].rotateX(-0.01);
    EdgeObject.vertices[i].rotateZ(-0.01);
  }
}


canvasEdge = document.getElementById('EdgeAnimationCanvas');
ctxEdge = canvasEdge.getContext('2d');

var zBuffer = [];
for (let i = 0; i < 500*500; i++) {
  zBuffer.push(-1000000);
}

var colors = [];
for (let i = 0; i < 500*500; i++) {
  colors.push(null);
}

function renderEdge(){

  let indexSet = new Set();

  for (let i = 0; i < EdgeObject.faces.length; i++) {
    let face = EdgeObject.faces[i];


    let p1 = EdgeObject.vertices[face.points[0]];
    let p2 = EdgeObject.vertices[face.points[1]];
    let p3 = EdgeObject.vertices[face.points[2]];

    let shadedColor = "#";

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
      shadedColor+=add;
  }

    let xMin = Math.ceil(Math.min(p1.x, p2.x, p3.x));
    let xMax = Math.ceil(Math.max(p1.x, p2.x, p3.x));
    let yMin = Math.ceil(Math.min(p1.y, p2.y, p3.y));
    let yMax = Math.ceil(Math.max(p1.y, p2.y, p3.y));

    let divider = (p2.y-p3.y)*(p1.x-p3.x)+(p3.x-p2.x)*(p1.y-p3.y);

    if(divider != 0){
      for (let x = xMin; x <= xMax; x+=1) {
        for (let y = yMin; y <= yMax; y+=1) {
            let l1 = ((p2.y-p3.y)*(x-p3.x)+(p3.x-p2.x)*(y-p3.y))/divider;
            let l2 = ((p3.y-p1.y)*(x-p3.x)+(p1.x-p3.x)*(y-p3.y))/divider;
            let l3 = 1-l1-l2;

            if(0 <= l1 && 0 <= l2 && 0 <= l3){
              let zIndex = Math.trunc(Math.trunc(y)*500+Math.trunc(x));
              let depth = l1*p1.z + l2*p2.z + l3*p3.z;
              indexSet.add(zIndex);


              if(depth >= zBuffer[zIndex]){
                zBuffer[zIndex] = depth;


                let finalColor = null;
                if((l1 < 0.02 && face.edges.includes(0)) ||
                   (l2 < 0.02 && face.edges.includes(1)) ||
                   (l3 < 0.02 && face.edges.includes(2))){
                  finalColor = "#111111";
                }
                else{
                  finalColor = shadedColor;

                }
                colors[zIndex] = finalColor;
              }
            }
        }
      }
    }
  }
  for (let i = 0; i < colors.length; i++) {
    if(colors[i] != null){
      ctxEdge.fillStyle = colors[i];
      ctxEdge.fillRect(i%500, Math.trunc(i/500), 1, 1);
    }
  }
  indexSet.forEach((v1, v2, set)=>{zBuffer[v1] = -1000000; colors[v2] = null;})

}



pauseEdge = false;
canvasEdge.addEventListener('click',() =>{pauseEdge = !pauseEdge}, false);

function loopEdge(){
  if(!pauseEdge){
    ctxEdge.clearRect(0, 0, 500, 500);
    transformEdge();
    renderEdge();
    reverseTransformEdge();
    continueRotationEdge();
  }
}

loopEdge();
pauseEdge = true;
setInterval(loopEdge, 33);
