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

objectWireframe = {
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


for (let i = 0; i < objectWireframe.vertices.length; i++) {
  objectWireframe.vertices[i].mul(50);
  objectWireframe.vertices[i].add(new Vector(250, 250, 0));
}

canvas = document.getElementById('wireframeCanvas');
ctx = canvas.getContext('2d');

for (let i = 0; i < objectWireframe.faces.length; i++) {
  let face = objectWireframe.faces[i];
  for (let j = 0; j < face.points.length; j++) {

    let vertex_0 = objectWireframe.vertices[face.points[j]];
    let vertex_1 = objectWireframe.vertices[face.points[(j+1)%3]];

    // Draw line
    ctx.beginPath();
    ctx.moveTo(vertex_0.x, vertex_0.y);
    ctx.lineTo(vertex_1.x, vertex_1.y);
    ctx.closePath();
    ctx.stroke();
  }
}
