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


objectTransformations = {
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


for (let i = 0; i < objectTransformations.vertices.length; i++) {
  objectTransformations.vertices[i].mul(50);
  objectTransformations.vertices[i].add(new Vector(250, 250, 0));
}


canvas = document.getElementById('basicTransformationsCanvas');
ctx = canvas.getContext('2d');

for (let i = 0; i < objectTransformations.faces.length; i++) {
  let face = objectTransformations.faces[i];
  for (let j = 0; j < face.points.length; j++) {

    let vertex = objectTransformations.vertices[face.points[j]];
    ctx.fillRect(Math.trunc(vertex.x), Math.trunc(vertex.y), 1, 1);
  }
}
