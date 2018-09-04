function Vector(x, y, z){
  this.x = x;
  this.y = y;
  this.z = z;
}

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


canvas = document.getElementById('projectionCanvas');
ctx = canvas.getContext('2d');

for (let i = 0; i < object.faces.length; i++) {
  let face = object.faces[i];
  for (let j = 0; j < face.points.length; j++) {

    let vertex = object.vertices[face.points[j]];
    ctx.fillRect(Math.trunc(vertex.x), Math.trunc(vertex.y), 1, 1);
  }
}
