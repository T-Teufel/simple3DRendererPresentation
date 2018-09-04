function Object3D(){
  this.triangles = [];
}

Object3D.prototype.addTriangle = function (vec1, vec2, vec3, color = "#FFFFFF", edgeColor=null, edges = null) {
  let finalEdges = null;
  if(edges == null){
    finalEdges = [
      [0, 1],
      [1, 2],
      [2, 0]
    ]
  }
  else{
    if(edges instanceof Array){
      for (let i = 0; i < edges.length; i++) {
        if(edges[i] instanceof Array && edges[i].length == 2){
          if((edges[i][0] == 0 || edges[i][0] == 1 || edges[i][0] == 2) &&
             (edges[i][1] == 0 || edges[i][1] == 1 || edges[i][1] == 2)){
               finalEdges = edges;
          }
        }
        else {
          throw new Error('edges must only contain arrays with two elements');
        }
      }
    }
    else{
      throw new Error('edges must be null or an array');
    }
  }
  if(edgeColor == null){
    edgeColor = color;
  }
  else{
    if(!isString(edgeColor)){
      throw new Error('edges must only contain arrays with two elements');
    }
  }


  if (vec1 instanceof Vector && vec2 instanceof Vector && vec3 instanceof Vector &&
      vec1.dim == 3 &&  vec2.dim == 3 && vec3.dim == 3) {
    if(isString(color)){
      this.triangles.push({
        vertices: [vec1, vec2, vec3],
        edges: finalEdges,
        color: color,
        edgeColor: edgeColor
      })
    }
    else{
      throw new Error('color must be a string');
    }
  }
  else{
      throw new Error('vec1, vec2 and vec3 must be 3d vectors');
  }




};

Object3D.prototype.translate = function (transVec) {
  if (transVec instanceof Vector && transVec.dim == 3) {
    for (let i = 0; i < this.triangles.length; i++) {
      for (let j = 0; j < this.triangles[i].vertices.length; j++) {
        this.triangles[i].vertices[j].add(transVec);
      }
    }
  }
  else{
      throw new Error('transVec must be a 3d vector');
  }
};

Object3D.prototype.applyMatrix = function (matrix) {
  if (matrix instanceof Matrix) {
    for (let i = 0; i < this.triangles.length; i++) {
      for (let j = 0; j < this.triangles[i].vertices.length; j++) {
        this.triangles[i].vertices[j].applyMatrix(matrix);
      }
    }
  }
  else{
      throw new Error('matrix must be a matrix');
  }
};

// Renderer

function Renderer(canvasId){
  if(!isString(canvasId)){
    throw new Error('canvasId must be a string');
  }

  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext('2d');

}

Renderer.prototype.resize = function(newWidth, newHeight){
  if(isNumeric(newWidth) && isNumeric(newHeight) &&
     newWidth > 0 && newHeight > 0){
       this.canvas.width = Math.trunc(newWidth);
       this.canvas.height = Math.trunc(newWidth);
  }
  else{
    throw new Error('newWidth and newHeight must be positve numbers');
  }
}

Renderer.prototype.save = function(){
  this.ctx.save();
}

Renderer.prototype.restore = function(){
  this.ctx.restore();
}

Renderer.prototype.setColor = function (color) {
  if(isString(color)){
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
  }
  else{
    throw new Error('color must be a string');
  }
};

Renderer.prototype.putPoint = function(x, y){
  if(isNumeric(x) && isNumeric(y)){
    this.ctx.fillRect(Math.trunc(x), Math.trunc(y), 1, 1);
  }
  else{
    throw new Error('x and y must be numbers')
  }
}

Renderer.prototype.line = function(x1, y1, x2, y2){
  if(isNumeric(x1) && isNumeric(y1) &&
     isNumeric(x2) && isNumeric(y2)){
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }
  else{
    throw new Error('x1, y1, x2 and y2 must be numbers')
  }
}

Renderer.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Renderer.prototype.renderPoints = function (object3D) {
  this.ctx.save();

  let tris = object3D.triangles

  for (let i = 0; i < tris.length; i++) {
    this.setColor(tris[i].color);
    let vertices =  tris[i].vertices;
    for (let j = 0; j < vertices.length; j++) {
      this.putPoint(vertices[j].content[0], vertices[j].content[1] )
    }
  }

  this.ctx.restore();
};

Renderer.prototype.renderWireframe = function (object3D) {
  this.ctx.save();

  let tris = object3D.triangles

  for (let i = 0; i < tris.length; i++) {
    this.setColor(tris[i].color);
    let edges =  tris[i].edges;
    for (let j = 0; j < edges.length; j++) {
      this.line(tris[i].vertices[edges[j][0]].content[0],
                tris[i].vertices[edges[j][0]].content[1],
                tris[i].vertices[edges[j][1]].content[0],
                tris[i].vertices[edges[j][1]].content[1],)
    }
  }

  this.ctx.restore();
};

Renderer.prototype.renderSolid = function (object3D) {
  this.ctx.save();

  let tris = object3D.triangles;
  let zBuffer = [];

  for (var i = 0; i < this.canvas.width*this.canvas.height; i++) {
    zBuffer.push(-100000000000000);
  }

  for (let i = 0; i < tris.length; i++) {

    let vertices =  tris[i].vertices;

    let xMin = Math.ceil(Math.min(vertices[0].content[0],
                        vertices[1].content[0],
                        vertices[2].content[0]));

    let xMax = Math.ceil(Math.max(vertices[0].content[0],
                        vertices[1].content[0],
                        vertices[2].content[0]));

    let yMin = Math.ceil(Math.min(vertices[0].content[1],
                        vertices[1].content[1],
                        vertices[2].content[1]));

    let yMax = Math.ceil(Math.max(vertices[0].content[1],
                        vertices[1].content[1],
                        vertices[2].content[1]));
    let divider =
      (vertices[0].content[1]-vertices[2].content[1])*
      (vertices[1].content[0]-vertices[2].content[0])+
      (vertices[1].content[1]-vertices[2].content[1])*
      (vertices[2].content[0]-vertices[0].content[0]);


    if(divider != 0){
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          let b1 = (
          (y-vertices[2].content[1])*
          (vertices[1].content[0]-vertices[2].content[0])+
          (vertices[1].content[1]-vertices[2].content[1])*
          (vertices[2].content[0]-x))/divider;

          let b2 = (
            (y-vertices[0].content[1])*
            (vertices[2].content[0]-vertices[0].content[0])+
            (vertices[2].content[1]-vertices[0].content[1])*
            (vertices[0].content[0]-x))/divider;

          let b3 = 1-b1-b2;


          if(b1 >= 0 && b1 <= 1 && b2 >= 0 && b2 <= 1 && b3 >= 0 && b3 <= 1){
            depth =
            b1 * vertices[0].content[2]+
            b2 * vertices[1].content[2]+
            b3 * vertices[2].content[2];

            let zIndex = y * this.canvas.width + x;

            if(zBuffer[Math.trunc(zIndex)] < depth){
              zBuffer[Math.trunc(zIndex)] = depth;
              let color;
              if (b1 <= 0.02 || b2 <= 0.02 || b3 <= 0.02) {
                color = tris[i].edgeColor

              } else {
                color = tris[i].color
              }

              let finalColor = "#";

              let e1 =  vertices[1].copy();
              let e2 =  vertices[2].copy();

              e1.sub(vertices[0]);
              e2.sub(vertices[0]);

              let cross = e1.cross(e2);
              cross.norm();

              let shade = Math.abs(cross.content[2]);

              for (let j = 0; j < 3; j++) {
                let value = parseInt(color.substring(2*j+1, 2*j+3), 16);
                value = Math.ceil(value*shade)
                //value = 132

                let add = (value).toString(16);
                while(add.length < 2){
                  add = "0"+add;
                }
                finalColor+=add;
              }

              this.setColor(finalColor);
              this.putPoint(x, y);

            }

          }
        }
      }
    }


  }
  this.ctx.restore();
};
