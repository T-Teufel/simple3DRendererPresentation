/*

Dependencies:
-> PredicateUtils.js

*/

// Matrix Section

function Matrix(content){
  // Predicates for content
  if (!Array.isArray(content) || content.length <= 0) {
    throw new Error('content must be an array with a length greater than 0');
  }
  if (!Array.isArray(content[0]) || content[0].length <= 0) {
    throw new Error('content must only contain arrays with a length greater than 0');
  }

  for (let i = 0; i < content.length; ++i){
    if (content[i].length != content[0].length) {
      throw new Error('All array in content must be of equal length');
    }

    for (let j = 0; j < content[i].length; j++) {
      if(!isNumeric(content[i][j])){
        throw new Error('All elements of a array in content must be numbers');
      }
    }

  }

  // Initizalizing values
  this.m = content.length;
  this.n = content[0].length;
  this.content = content;
}

Matrix.prototype.toString = function () {
  ret = "";

  for (let i = 0; i < this.content.length; i++) {
    ret += this.content[i].toString() + '\n';
  }

  return ret
};
Matrix.prototype.add = function (other) {
  if(!(other instanceof Matrix) || other.m != this.m || other.n != this.n){
    throw new Error('Argument must be a matrix with m=' + this.m +' and n='+this.n);
  }

  for (let i = 0; i < this.m; ++i){
    for (let j = 0; j < this.n; ++j){
        this.content[i][j] += other.content[i][j];
    }
  }

};
Matrix.prototype.sub = function (other) {
  if(!(other instanceof Matrix) || other.m != this.m || other.n != this.n){
    throw new Error('Argument must be a matrix with m=' + this.m +' and n='+this.n);
  }

  for (let i = 0; i < this.m; ++i){
    for (let j = 0; j < this.n; ++j){
        this.content[i][j] -= other.content[i][j];
    }
  }

};
Matrix.prototype.mul = function (scalar) {
  if(!isNumeric(scalar)){
    throw new Error('Scalar must be a number');
  }

  for (let i = 0; i < this.m; ++i){
    for (let j = 0; j < this.n; ++j){
        this.content[i][j] *= scalar;
    }
  }

};

function getRotmaX3D(angle){
  if(!isNumeric(angle)){
    throw new Error('angle must be a number');
  }
  return new Matrix([
    [1, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle)],
    [0, Math.sin(angle), Math.cos(angle)]
  ])
}
function getRotmaY3D(angle){
  if(!isNumeric(angle)){
    throw new Error('angle must be a number');
  }
  return new Matrix([
    [Math.cos(angle), 0, Math.sin(angle)],
    [0, 1, 0],
    [-Math.sin(angle), 0, Math.cos(angle)]
  ])
}
function getRotmaZ3D(angle){
  if(!isNumeric(angle)){
    throw new Error('angle must be a number');
  }
  return new Matrix([
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1]
  ])
}

function getIdenty(dim){
  if(!isNumeric(dim) || dim <= 1){
    throw new Error('dim must be an number greater than 1');
  }

  dim = Math.trunc(dim);
  let arg = [];
  for (let i = 0; i < dim; i++) {
    let holder = [];
    for (let j = 0; j < dim; j++) {

      if(i == j){holder.push(1);}
      else{holder.push(0);}

    }
    arg.push(holder);
  }

  return new Matrix(arg);
}
function getRotmaN(dim, v1, v2, angle){
  if(!isNumeric(dim) || dim <= 2 ||
     !isNumeric(v1) || v1 < 0 || v1 >= dim ||
     !isNumeric(v2) || v2 < 0 || v2 >= dim){
      throw new Error('dim must be an number greater than 2 and v1/v2 must be a number between dim and 0');
  }
  dim = Math.trunc(dim);
  v1 = Math.trunc(v1);
  v2 = Math.trunc(v2);

  let holder = [];
  for (let i = 0; i < dim; i++) {
     if(i == v1){
       holder.push(1);
     }
     else{
       holder.push(0);
     }
   }
  g1 = new Vector(...holder);

  holder = [];
  for (let i = 0; i < dim; i++) {
    if(i == v2){
      holder.push(1);
    }
    else{
      holder.push(0);
    }
  }
  g2 = new Vector(...holder);

  let V = g1.dyadicProduct(g1);
  V.add(g2.dyadicProduct(g2));
  V.mul(Math.cos(angle)-1);

  let W = g1.dyadicProduct(g2);
  W.sub(g2.dyadicProduct(g1));
  W.mul(Math.sin(angle));

  let I = getIdenty(dim);

  let R = I;
  R.add(V)
  R.sub(W)

  return R
}

// Vector Section

function Vector(){
  this.content = [];
  for (let i = 0; i < arguments.length; ++i){
    if (!isNumeric(arguments[i])) {
      throw new Error('All arguments must be numbers');
    }
    this.content[i] = arguments[i];
  }
  this.dim =this.content.length;
}

Vector.prototype.toString = function () {
  return this.content.toString()
};
Vector.prototype.copy = function () {
  return new Vector(...this.content);
};
Vector.prototype.getX = function () {

};

Vector.prototype.add = function (other) {
  if(!(other instanceof Vector) || other.dim != this.dim){
    throw new Error('Argument must be a vector with dimesion ' + this.dim);
  }

  for (let i = 0; i < this.dim; ++i){
      this.content[i] += other.content[i];
  }

};
Vector.prototype.sub = function (other) {
  if(!(other instanceof Vector) || other.dim != this.dim){
    throw new Error('Argument must be a vector with dimesion ' + this.dim);
  }

  for (let i = 0; i < this.dim; ++i){
      this.content[i] -= other.content[i];
  }

};
Vector.prototype.mul = function (scalar) {
  if(!isNumeric(scalar)){
    throw new Error('Scalar must be a number');
  }

  for (let i = 0; i < this.dim; ++i){
      this.content[i] *= scalar;
  }

};

Vector.prototype.mag = function () {
  let ret = 0;

  for (let i = 0; i < this.dim; ++i){
        ret += this.content[i] * this.content[i];
  }

  ret = Math.sqrt(ret);
  return ret
};
Vector.prototype.norm = function () {
  let length = this.mag();
  for (let i = 0; i < this.dim; ++i){
        this.content[i] /= length;
  }
};

Vector.prototype.cross = function (other) {
  if(this.dim != 3 || !(other instanceof Vector) || other.dim != this.dim){
    throw new Error('this and other must be a vector with dimesion 3');
  }

  return new Vector(
    this.content[1]*other.content[2]-this.content[2]*other.content[1],
    this.content[2]*other.content[0]-this.content[0]*other.content[2],
    this.content[0]*other.content[1]-this.content[1]*other.content[0]
  )
};

Vector.prototype.applyMatrix = function (matrix) {
  if(!(matrix instanceof Matrix) || matrix.n != this.dim){
    throw new Error('Matrix is invalid');
  }

  let holder = [];
  for(let i = 0; i < this.dim; i++) {
    holder.push(0);
  }

  for (let i = 0; i < this.dim; i++) {
    for (let j = 0; j < matrix.m; j++) {
      holder[i] += this.content[j]*matrix.content[i][j];
    }
  }

  this.content = holder;
};

Vector.prototype.dyadicProduct = function (other) {
  if(!(other instanceof Vector)){
    throw new Error('argument must be a vector');
  }

  let arg = [];
  for (let i = 0; i < this.dim; i++) {
    let holder = [];
    for (let j = 0; j < other.dim; j++) {
      holder.push(this.content[i]*other.content[j]);
    }
    arg.push(holder)
  }
  return new Matrix(arg);
};
