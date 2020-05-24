class Matrix {
  constructor(cols=2, rows=3, float=false) {

    this.cols = cols;
    this.rows = rows;

    // the actual matrix / array of arrays
    this.matrix = this.create2DArray(this.cols, this.rows);

    // randomizing the matrix
    this.random();

    if (float) {
      this.randomFloat();
    }

    // the functions of the matrix API
    // -------------------------------------------------------------------------
    // - non-static functions
    //   - create2DArray
    //       => creates a simple 2D array
    //   - print
    //       => prints out the correct version of the matrix to the console
    //       => also returns this string
    //   - map
    //       => applies a given function to each element of the matrix
    //   - random
    //       => gives each element of the matrix a random integer value between the given range
    //   - randomFloat
    //       => gives each element of the matrix a random float value between the given range
    //   - clone
    //       => returns a clone of this matrix
    //
    // - static functions
    //   - forEach
    //       => calls the given callback function for each element of the array and gives as arguments:
    //       => the item, the i (what collum), the j (what row)
    //   - map
    //       => returns a matrix that is equivelant to the given matrix but with each element mapped with the given function
    //   - clone
    //       => returns a clone of the given matrix



  }

  create2DArray(cols, rows) {
    let arr = new Array(cols);

    for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
      for (let j = 0; j < rows; j++) {
        arr[i][j] = 0;
      }
    }

    return arr;

  }

  static forEach(matrix, callback) {
    for (let i = 0; i < matrix.cols; i++) {
      for (let j = 0; j < matrix.rows; j++) {
        callback(matrix.matrix[i][j], i, j);
      }
    }
  }

  static fromArray(array) {
    let result = new Matrix(1, array.length);
    result.matrix[0] = Array.from(array);
    return result;
  }

  toArray() {
    return Array.from(this.matrix[0]);
  }

  static combine (a , b ) {

    if (!Matrix.canElementwise(a,b)) {
      console.error('Matrices don\'t have the correct dimensions!');
      return undefined;
    }

    let c = new Matrix(a.cols, b.cols);

    Matrix.forEach(c, (item , i, j) => {

      // wheter to use matrix a or b
      let ch = Math.ceil(Math.random() * 2) - 1;

      if (ch == 0) {
        c.matrix[i][j] = a.matrix[i][j];
      } else {
        c.matrix[i][j] = b.matrix[i][j];
      }


    });

    return c;

  }

  print() {
    // should print out the correct matrix
    let string = '';

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        string += '|' + this.matrix[j][i].toString()

        if (j == this.cols - 1) {
          string+='|';
        }
      }
      string += '\n';
    }
    console.log(string);
    return string;
  }

  map(fc) {

    Matrix.forEach(this, (item, i, j) => {
      this.matrix[i][j] = fc(item);
    });

  }

  static map(matrix, fc) {
    let result_matrix = new Matrix(matrix.cols, matrix.rows);

    Matrix.forEach(matrix, (item, i, j) => {
      result_matrix.matrix[i][j] = fc(item);
    });

    return result_matrix;
  }

  round(n, decimals=0) {
    return Math.round(n * Math.pow(10, decimals))/ Math.pow(10, decimals);
    return Math.round(Math.random() * min * Math.pow(10, 4))/ Math.pow(10, 4);

	}

  random(min=10, max) {
    if (max == undefined) {
      this.map( function(n) { return Math.round(Math.random() * min) } );
    } else {
      this.map( function(n) { return Math.round(Math.random() * max + min) } );
    }

  }

  randomFloat(min=0.2, max) {

    if (max == undefined) {
      this.map( function(n) { return Math.round(Math.random() * min * Math.pow(10, 4))/ Math.pow(10, 4); } );
    } else {
      this.map( function(n) { return Math.round(Math.random() * max + min * Math.pow(10, 4))/ Math.pow(10, 4); } );
    }
  }

  static clone(matrix) {
    let clonedMatrix = new Matrix(matrix.cols, matrix.rows);
    clonedMatrix.matrix = Array.from(matrix.matrix);
    return clonedMatrix;
  }

  clone() {
    let clonedMatrix = new Matrix(this.cols, this.rows);
    clonedMatrix.matrix = Array.from(this.matrix);
    return clonedMatrix;
  }

  // IDEA: COMBINE shuffle

  transpose() {

    let newMatrix = new Matrix(this.rows, this.cols);

    for (let i = 0; i < newMatrix.cols; i++) {
      for (let j = 0; j < newMatrix.rows; j++) {
        newMatrix.matrix[i][j] = this.matrix[j][i];
      }
    }

    this.matrix = Array.from(newMatrix.matrix);
    this.cols = newMatrix.cols;
    this.rows = newMatrix.rows;
  }

  static transpose(matrix) {

    // the new matrix to return
    let newMatrix = new Matrix(matrix.rows, matrix.cols);

    for (let i = 0; i < newMatrix.cols; i++) {
      for (let j = 0; j < newMatrix.rows; j++) {
        newMatrix.matrix[i][j] = matrix.matrix[j][i];
      }
    }

    return newMatrix;
  }

  static canElementwise(a, b) {
    return (a.cols == b.cols && b.rows == a.rows);
  }

  static canProduct(a, b) {
    return (a.cols == b.rows);
  }

  add(b) {
    this.nonStaticOperation(b, 'addition');
  }
  substract(b) {
    this.nonStaticOperation(b, 'substraction');
  }
  multiply(b) {
    this.nonStaticOperation(b, 'multiplication');
  }
  divide(b) {
    this.nonStaticOperation(b, 'division');
  }

  nonStaticOperation(b, type) {

    if (b instanceof Matrix) {

      // do an elementwise operation

      if (!Matrix.canElementwise(this, b)) {
        console.error('Matrices do not have the correct dimensions to perform ' + type + '!');
        return undefined;
      }

      Matrix.forEach(this, (item, i, j) => {

        if (type == 'addition') {
          this.matrix[i][j] += b.matrix[i][j];
        }
        if (type == 'substraction') {
          this.matrix[i][j] -= b.matrix[i][j];
        }
        if (type == 'multiplication') {
          this.matrix[i][j] = this.matrix[i][j] * b.matrix[i][j];
        }
        if (type == 'division') {
          this.matrix[i][j] = this.matrix[i][j] / b.matrix[i][j];
        }


      });


    } else {

      // b is a int or float number

      Matrix.forEach(this, (item, i, j) => {

        if (type == 'addition') {
          this.matrix[i][j] += b;
        }
        if (type == 'substraction') {
          this.matrix[i][j] -= b;
        }
        if (type == 'multiplication') {
          this.matrix[i][j] = this.matrix[i][j] * b;
        }
        if (type == 'division') {
          this.matrix[i][j] = this.matrix[i][j] / b;
        }


      });


    }

  }


  static add(a, b) {
    let result = Matrix.staticOperation(a, b, 'addition');
    return result;
  }
  static substract(a, b) {
    let result = Matrix.staticOperation(a, b, 'substraction');
    return result;
  }
  static multiply(a, b) {
    let result = Matrix.staticOperation(a, b, 'multiplication');
    return result;
  }
  static divide(a, b) {
    let result = Matrix.staticOperation(a, b, 'division');
    return result;
  }


  static staticOperation(a, b, type) {

    if (b instanceof Matrix) {

      // do an elementwise operation

      if (!Matrix.canElementwise(a, b)) {
        console.error('Matrices do not have the correct dimensions to perform ' + type + '!');
        return undefined;
      }

      let result_matrix = new Matrix(a.cols, a.rows);

      Matrix.forEach(result_matrix, (item, i, j) => {

        if (type == 'addition') {
          result_matrix.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];
        }
        if (type == 'substraction') {
          result_matrix.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
        }
        if (type == 'multiplication') {
          result_matrix.matrix[i][j] = a.matrix[i][j] * b.matrix[i][j];
        }
        if (type == 'division') {
          result_matrix.matrix[i][j] = a.matrix[i][j] / b.matrix[i][j];
        }


      });

      return result_matrix;

    } else {

      let result_matrix = new Matrix(a.cols, a.rows);

      Matrix.forEach(result_matrix, (item, i, j) => {

        if (type == 'addition') {
          result_matrix.matrix[i][j] = a.matrix[i][j] + b;
        }
        if (type == 'substraction') {
          result_matrix.matrix[i][j] = a.matrix[i][j] - b;
        }
        if (type == 'multiplication') {
          result_matrix.matrix[i][j] = a.matrix[i][j] * b;
        }
        if (type == 'division') {
          result_matrix.matrix[i][j] = a.matrix[i][j] / b;
        }


      });

      return result_matrix;

    }


  }

  // static product(a, n) {
  //
  //   if (a.cols != n.rows) {
  //     console.error('Matrices don\'t have the correct dimensions!');
  //     return undefined;
  //   }
  //
  //   // the new matrix to return
  //   let c = new Matrix(a.rows, n.cols);
  //
  //   Matrix.forEach(c, (item, i, j) => {
  //
  //     let sum = 0;
  //
  //     for (let x = 0; x < a.cols; x++) {
  //       sum += a.matrix[x][j] * n.matrix[i][x];
  //     }
  //
  //     c.matrix[i][j] = sum;
  //
  //   });
  //
  //   return c;
  // }

  static product(a, n) {

    if (a.cols != n.rows) {
      console.error('Matrices don\'t have the correct dimensions!');
      return undefined;
    }

    // the new matrix to return
    let c = new Matrix(n.cols, a.rows, false);

    for (let i = 0; i < c.cols; i++ ){
      for (let j = 0; j < c.rows; j++) {

        let sum = 0;

        for (let x = 0; x < a.cols; x++) {
          sum += a.matrix[x][j] * n.matrix[i][x];
        }

        c.matrix[i][j] = sum;

      }
    }

    return c;

  }

}
