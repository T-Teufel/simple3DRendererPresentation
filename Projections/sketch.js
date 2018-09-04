
function Cube(dim, width=1){
    if(isNumeric(dim) && dim > 1 && isNumeric(width) && width > 0){
      let vertices = [];
      let edges = [];

      let base = [];
      for (let i = 0; i < dim; i++) {
        base.push(0);
      }

      vertices.push(new Vector(...base))
      base[0] = width;

      vertices.push(new Vector(...base))
      base[0] = 0;

      edges.push([0, 1]);


      for (let i = 1; i < dim; i++) {
        base[i] = width;
        let addVec = new Vector(...base);
        base[i] = 0;

        let currentVertices = vertices.length;
        let currentEdges = edges.length;

        for (let j = 0; j < currentVertices; j++) {
          let newVec = vertices[j].copy();
          newVec.add(addVec);
          vertices.push(newVec);
          edges.push([j, currentVertices+j])
        }

        for (let j = 0; j < currentEdges; j++) {
          let edge = edges[j].slice();

          for (let k = 0; k < edge.length; k++) {
            edge[k] += currentVertices;
          }

          edges.push(edge);
        }

      }
        this.vertices = vertices;
        this.edges = edges;
      }
    else {
      throw new Error('dim/width must be an number greater than 1');
    }
  }

Cube.prototype.orthographicProjection = function (plane) {
  for (var i = 0; i < this.edges.length; i++){

    plane.line(this.vertices[this.edges[i][0]].content[0],
               this.vertices[this.edges[i][0]].content[1],
               this.vertices[this.edges[i][1]].content[0],
               this.vertices[this.edges[i][1]].content[1]);
  }
};

Cube.prototype.translate = function (vec) {
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i].add(vec)
    }
};

Cube.prototype.applyMatrix = function (matrix) {
  for (let i = 0; i < this.vertices.length; i++) {
    this.vertices[i].applyMatrix(matrix)
  }
};

// Animation

var plane = new Renderer('canvas');

obj = new Object3D();



obj.addTriangle(
  new Vector(100,100,100),
  new Vector(0,0,100),
  new Vector(0,100,0),
  "#00FF00",
  "#000000"
)

obj.addTriangle(
  new Vector(100,100,100),
  new Vector(0,0,100),
  new Vector(100,0,0),
  "#FF0000",
  "#000000"
)


obj.addTriangle(
  new Vector(0,100,0),
  new Vector(100,0,0),
  new Vector(100,100,100),
  "#FFFF00",
  "#000000"
)

obj.addTriangle(
  new Vector(0,100,0),
  new Vector(100,0,0),
  new Vector(0,0,100),
  "#0000FF",
  "#000000"
)

plane.resize(500, 500);
plane.setColor("#FFFFFF")


obj.translate(new Vector(250, 250, 0))

plane.clear();
obj.translate(new Vector(-250, -250, 0))
obj.applyMatrix(getRotmaX3D(0.1))
obj.applyMatrix(getRotmaY3D(0.1))

obj.translate(new Vector(250, 250, 0))

plane.renderSolid(obj);


function loop(){

}
//setInterval(loop, 100);
