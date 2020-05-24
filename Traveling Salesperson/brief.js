let _ = (function() {

  // using strict
  'use strict';

  // the methods
  let brief = {};

  // the current version
  let version = 'v0.0.0';

  // need for the memorized function
  let memorizedFunctionResult = {}

  // variables used for the matrix operations
  let ADD='ADD',SUB="SUB",MUL='MUL',DIV='DIV',PRDCT='PRDCT';

  // the different types an argument could be
  let ARR='array',INT='integer',FLT='float',FNC='function',STR='string',OBJ='object',NMR='number',BLN='boolean', LOL='element'
  let ARRS='array of arrays',INTS='array of integers',FLTS='array of floats',FNCS='array of functions',STRS='array of strings',OBJS='array of objects', NMRS='array of numbers',BLNS='array of booleans'

  // the different types of classes
  let MTRX='matrix object', VCTR='vector object'


  //  ---------------------------------------
  // ---------------------------------------
  // ---------------------------------------

  /**
  *
  * A function to remind people to give in their function
  *
  * @private
  * @since 0.0.0
  *
  */
  function giveACallbackFunctionFunction() {
    console.warn('you should probraly give a custom callback function! :D')
  }

  /**
  *
  * Merge sort algorithm from
  * https://reactgo.com/merge-sort-algorithm-javascript/
  *
  * @private
  * @since 0.0.0
  *
  */
  function mergeSort(array,half = array.length/2){

    if(array.length < 2){
      return array
    }

    const left = array.splice(0,half); //left part of array

    return merger(mergeSort(left),mergeSort(array))
  }

  // required for the merge sort
  /**
  *
  * Merge sort algorithm from
  * https://reactgo.com/merge-sort-algorithm-javascript/
  *
  * @private
  * @since 0.0.0
  *
  */
  function merger(left,right){

    const arr = [];

    while(left.length && right.length){
      if(left[0] < right [0]){
        arr.push(left.shift())
      }else{
        arr.push(right.shift())
      }
    }

    return [...arr,...left,...right];
  }

  // required for date and time functions
  /**
  *
  * Returns the date depending on given parameters
  *
  * @private
  * @since 0.0.0
  *
  */
  function gDt(type, st) {
    let d = new Date()
    if (type == 'arr') {
      if (st == 'time') {return [d.getHours(), d.getMinutes(), d.getSeconds()]}
      if (st == 'date') {return [d.getDate(), d.getMonth() + 1, d.getFullYear()]}
    }
    if (type == 'str') {
      if (st == 'time') {return (d.getHours()).toString() + ':' + (d.getMinutes()).toString() + ':' + (d.getSeconds()).toString()}
      if (st == 'date') {return (d.getDate()).toString() + '-' + (d.getMonth() + 1).toString() + '-' + (d.getFullYear()).toString()}
    }
    switch (type) {
      case 'year':
      return d.getFullYear()
      case 'month':
      return d.getMonth() + 1
      case 'day':
      return d.getDate()
      case 'hours':
      return d.getHours()
      case 'minutes':
      return d.getMinutes()
      case 'seconds':
      return d.getSeconds()
      case 'mili':
      return d.getMilliseconds()
      default:
      return d.getTime()
    }
  }


  /**
  *
  * Maps given value from a range to another range
  * from
  * https://github.com/processing/p5.js/blob/1.0.0/src/math/calculation.js#L416
  * https://p5js.org/reference/#/p5/map
  * @private
  * @since 0.0.0
  * @param {Number} the value to map
  * @param {Number} the start of the first range
  * @param {Number} the end of the first range
  * @param {Number} the start of the second range
  * @param {Number} the end of the second range
  *
  */
  function mapNumber(n, start1, stop1, start2, stop2) {
    let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval
  };

  /**
  *
  * Checks whether or not the given var is of the given type
  *
  * @private
  * @since 0.0.0
  * @param {String} is the given variable this type?
  * @param {*} the variable to check
  * @returns {Bool} is it?
  *
  */
  function checkType(type, a) {

    if (type == ARR) {return isArray(a)}
    if (type == INT) {return isInt(a)}
    if (type == FLT) {return isFloat(a)}
    if (type == NMR) {return isNumber(a)}
    if (type == STR) {return isString(a)}
    if (type == FNC) {return isFunction(a)}
    if (type == OBJ) {return isObject(a)}
    if (type == BLN) {return isBool(a)}
    if (type == LOL) {return true}

    if (type == ARRS) {return checkList(ARR, a)}
    if (type == INTS) {return checkList(INT, a)}
    if (type == FLTS) {return checkList(FLT, a)}
    if (type == NMRS) {return checkList(NMR, a)}
    if (type == STRS) {return checkList(STR, a)}
    if (type == FNCS) {return checkList(FNC, a)}
    if (type == OBJS) {return checkList(OBJ, a)}
    if (type == BLNS) {return checkList(BLN, a)}


  }

  // quickly loops through an array to check the elements' types (for the checkType function)
  function checkList(type, arr) {
    let i = true
    loop(arr, (el) => {
      i = checkType(type,el) && i
    })
    return i
  }

  /**
  *
  * Are all the elements of the given argument object the corresponding type in the given arr
  *
  * @private
  * @since 0.0.0
  * @param {Array} the needed types
  * @param {Arguments} the argument object
  * @returns {Bool} are the arguments the corresponding type?
  *
  */
  function checkArgs(ne, arg, log=true) {

    // the arguments as an array
    let args = [...arg]

    // are the arguments the types
    let corr = true

    // checking the arguments
    loop(ne, (el , i) => {

      // checking
      corr = corr && checkType(el, args[i])

    }, false)

    // loggin an error message
    if (!corr && log) {
      console.error('Given arguments should be of type : ' + ne.toString())
    }

    // returning
    return corr

  }

  /**
  *
  * Used for the same purposes as checkArgs, but checks the lengths of the given arrays
  *
  * @private
  * @since 0.0.0
  * @param {Array} the arrays to check
  * @returns {Bool} are the arrays of the same length?
  *
  */
  function checkLength(arrs) {

    let corr = true
    let length = arrs[0].length
    loop(arrs, (el, i) => {
      corr = corr && el.length == length
    })

    if (!corr) {
      console.error('Given arrays need to have the same length.')
    }

    return corr
  }





  /**
  *
  * Checks all kinds of stuff for the different functions, classes
  *
  * @private
  * @since 0.0.0
  *
  */
  function sameSet(a,b) {

    if (isClass(a,Matrix) && isClass(b,Matrix)) {
      return (a.cols == b.cols && a.rows == b.rows)
    }

  }

  /**
  *
  * In order to avoid some repetition, we use this function to perform operations with the matrix class
  *
  * @private
  * @since 0.0.0
  *
  */
  function operation(m,n, op=ADD) {

    let a = m.clone()

    if (op == PRDCT) {
      let c = new Matrix(n.cols, a.rows);

      for (let i = 0; i < c.cols; i++ ){
        for (let j = 0; j < c.rows; j++) {

          let sum = 0;

          for (let x = 0; x < a.cols; x++) {
            sum += a[x][j] * n[i][x];
          }

          c[i][j] = sum;

        }
      }

      return c

    }
    if (isNumber(n)) {

      doubleLoop(a, (el, i,j) => {
        if (op==ADD) {
            a[i][j] += n
        } else if (op==SUB) {
            a[i][j] -= n
        } else if (op==DIV) {
            a[i][j] /= n
        } else if (op==MUL) {
            a[i][j] *= n
        }

      })

    }
    if (isClass(n,Matrix)) {

      if (!sameSet(a,n)) {
          console.warn('Given matrices should have the same cols & rows!')
          return;
      }

      doubleLoop(n, (el,i,j) => {
        if (op==ADD) {
            a[i][j] += el
        } else if (op==SUB) {
            a[i][j] -= el
        } else if (op==DIV) {
            a[i][j] /= el
        } else if (op==MUL) {
            a[i][j] *= el
        }
      })

    }

    return a

  }

  /**
  *
  * A way of handling large collections of custom object.
  * Using functions such as add, remove, clear, get , map, ..
  *
  * @since 0.0.0
  * @returns {collection} the new collection object
  *
  */
  function Collection() {

    this.collec = []
    this.length = 0

  }

  /**
  *
  * For creating a collection object, for convenience's sake.
  *
  * @since 0.0.0
  * @returns {collection} the actual out object
  *
  */
  function createCollection() {
    return new Collection()
  }

  /**
  *
  * Returns either the index or the element at that index
  *
  *
  * @since 0.0.0
  * @param {*} the index (int) or the element (object)
  * @returns {*} the element at the given index or the index of the given element
  */
  Collection.prototype.get = function(n) {

    if (isInt(n)) {
      return this.collec[n]
    }
    if (isObject(n)) {
      return this.indexOf(n)
    }

  }

  /**
  *
  * Adding either an array of objects, an object , or calling a function that returns an object and adding it to the array of objects.
  *
  *
  * @since 0.0.0
  * @param {Number}{Object} this can be a number or the new object to add
  * @param {Function} if a number was given it will call this function wich should return a object, n times and add it to the array list
  *
  */
  Collection.prototype.add = function(n, addFunc) {

    if (isObject(n)) {
      n['collectionID'] = randstring(25)
      this.collec.push(n);

    } else if (isArray(n)) {

      loop(n, (el) => {
        el['collectionID'] = randstring(25)
        this.collec.push(el);
      })

    } else {
      iterate(n, () => {
        let new_obj = addFunc()
        new_obj['collectionID'] = randstring(25)
        this.collec.push(new_obj)
      });

    }
  }

  /**
  *
  * Removes all of the objects inside this collection
  *
  * @private
  * @since 0.0.0
  *
  */
  Collection.prototype.clear = function() {
    this.collec = []
  }

  /**
  *
  * Used for getting the index of a specifc object
  *
  * @private
  * @since 0.0.0
  * @param {String} the id of the object to find
  * @returns {Int} the index of the object
  *
  */
  Collection.prototype.indexOf = function(n) {
    let index = undefined
    if (isObject(n)) {
      loop(this.collec, (el, i ) => {
        if (el['collectionID'] == n['collectionID']) {
          index = i

        }
      })
    } else {
      loop(this.collec, (el, i ) => {
        if (el['collectionID'] == n) {
          index = i
        }
      })
    }

    return index

  }

  /**
  *
  * Will remove the object or the object at the given inde
  *
  * @since 0.0.0
  * @param {*} the index or the actual object
  *
  */
  Collection.prototype.remove = function(c) {

    if (isObject(c)) {

      c = this.indexOf(c)
    }

    this.collec = removeAt(this.collec,c)

  }

  /**
  *
  * Applies a given function to each ojbect in the collection
  *
  * @since 0.0.0
  * @param {Fucntion} the function to apply to each object in the collection
  *
  *
  */
  Collection.prototype.map = function(func) {
    loop(this.collec, (el, i) => {
      this.collec[i] = func(el)
    })
  }

  /**
  *
  * Logs all the objects
  *
  * @since 0.0.0
  *
  *
  */
  Collection.prototype.log = function() {
    console.log(this.collec)
  }

  /**
  *
  * The Matrix class, has a property 'matrix' wich is a doubleArray that contains all the data for the matrix
  * The Class also allows the use of functions like : add,sub,div,mul, product(matrix product), map, loop (use doubleLoop), clone, transpose, randomize, scalor operations, etc.
  *
  *
  * @since 0.0.0
  * @cat {MATRIX}
  * @param {INT} the width of the matrix
  * @param {INT} the heigth of the matrix
  * @returns {MTRX} the actual matrix object
  *
  */
  function Matrix(cols=1,rows=1) {
    this.cols = cols
    this.rows = rows
    this.length = cols

    // creating the arrays
    for (let i = 0; i < cols; i++) {
      this[i] = array(rows)
      for (let j = 0; j < rows; j++) {
        this[i][j] = undefined
      }
    }

  }



  /**
  *
  * Returns a new matrix object
  *
  *
  * @since 0.0.0
  * @param {Int} the width of the matrix
  * @param {Int} the heigth of the matrix
  * @returns {Matrix} the actual matrix object
  *
  */
  function createMatrix(c=1,r=1) {
    return new Matrix(c,r)
  }

  /**
  *
  * Set each value of the matrix
  *
  *
  * @since 0.0.0
  * @param {*} the value or functions to give each object
  *
  */
  Matrix.prototype.set = function(v) {

    if (isFunction(v)) {

      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {

          this[i][j] = v(this[i][j], i, j)

        }
      }

    } else {

      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          this[i][j] = v
        }
      }

      }
    }


    /**
    *
    * Log the matrix to the console
    *
    *
    * @since 0.0.0
    *
    */
    Matrix.prototype.log = function() {
      printDoubleArray(this)
    }

    /**
    *
    * Transposes this matrix object
    *
    *
    * @since 0.0.0
    *
    */
    Matrix.prototype.transpose = function(log=true) {
      if (log) {console.warn('Using the static _.Matrix.transpose function is recommended. Give false as argument to remove this message.');}
      let e = Matrix.transpose(this)

      e.log()


      this.cols = e.cols
      this.rows = e.rows
      this.length = e.length

      doubleLoop(e, (el , i, j) => {
        this[i][j] = el
      })


    }

    /**
    *
    * Static version of the transpose function
    *
    * @static
    * @since 0.0.0
    * @param {Matrix} the matrix object to transpose
    * @returns {Matrix} the transposed matrix object
    *
    */
    Matrix.transpose = function(m) {
      

      let e = new Matrix(m.rows, m.cols)

      e.set( (el, i, j) => {
        return m[j][i]
      })

      return e


    }

    /**
    *
    * Static version of the 'add' function
    *
    * @static
    * @since 0.0.0
    * @param {*} either matrix or the scalor operation
    *
    */
    Matrix.add = function(a,b) {
      return operation(a,b,ADD)
    }

    /**
    *
    * Statis version of the 'sub' function
    *
    * @static
    * @since 0.0.0
    * @param {*} either matrix or the scalor operation
    *
    */
    Matrix.sub = function(a,b) {
      return operation(a,b,SUB)
    }

    /**
    *
    * Statis version of the 'div' function
    *
    * @static
    * @since 0.0.0
    * @param {*} either matrix or the scalor operation
    *
    */
    Matrix.div = function(a,b) {
      return operation(a,b,DIV)
    }

    /**
    *
    * Statis version of the 'mul' function
    *
    * @static
    * @since 0.0.0
    * @param {*} either matrix or the scalor operation
    *
    */
    Matrix.mul = function(a,b) {
      return operation(a,b,MUL)
    }

    /**
    *
    * Performs a matrix product with the two given arrays
    *
    * @static
    * @since 0.0.0
    * @param {Matrix} the first matrix of the matrix product
    * @param {Matrix} the second matrix of the matrix product
    * @returns {Matrix} the matrix product of the two matrciess
    *
    */
    Matrix.product = function(a,n) {
      return operation(a,n,PRDCT)
    }



    /**
    *
    * Returns a copy of the matrix
    *
    *
    * @since 0.0.0
    * @returns {Matrix} a copy of the matrix
    *
    */
    Matrix.prototype.clone = function() {
      
      let m = createMatrix(this.cols ,this.rows)

      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {

          m[i][j] = this[i][j]

        }

      }

      return m


    }

    /**
    *
    * Randomizes this matrix
    *
    *
    * @since 0.0.0
    *
    */
    Matrix.prototype.randomize = function(min,max) {
      let start = (max == undefined) ? 0 : min
      let end = (max == undefined) ? min : max

      this.set(() => {
          return randint(start,end)
      })
    }

    /**
    *
    * Adds either a given number to each element of the matrix (scalor oper.) or adds a value corresponding to other matrix (element wise oper.)
    *
    *
    * @since 0.0.0
    * @param {*} either the matrix or the scalor
    *
    */
    Matrix.prototype.add = function(n) {

      let c = operation(this,n,ADD)
      doubleLoop(c, (el, i, j) => {
        this[i][j] = el
      })

    }

    /**
    *
    * Subtracts either a given number from each element of the matrix (scalor oper.) or Subtracts a value corresponding to other matrix (element wise oper.)
    *
    *
    * @since 0.0.0
    * @param {*} either the matrix or the scalor
    *
    */
    Matrix.prototype.sub = function(n) {

      let c = operation(this,n,SUB)
      doubleLoop(c, (el, i, j) => {
        this[i][j] = el
      })

    }

    /**
    *
    * Multiplies either a given number from each element of the matrix (scalor oper.) or multiplies each value corresponding to other matrix (element wise oper.)
    *
    *
    * @since 0.0.0
    * @param {*} either the matrix or the scalor
    *
    */
    Matrix.prototype.mul = function(n) {

      let c = operation(this,n,MUL)
      doubleLoop(c, (el, i, j) => {
        this[i][j] = el
      })

    }

    /**
    *
    * Divides either a given number from each element of the matrix (scalor oper.) or divides each value corresponding to other matrix (element wise oper.)
    *
    *
    * @since 0.0.0
    * @param {*} either the matrix or the scalor
    *
    */
    Matrix.prototype.div = function(n) {

      let c = operation(this,n,DIV)
      doubleLoop(c, (el, i, j) => {
        this[i][j] = el
      })

    }


    /**
    *
    * The Vector class that contains all the neccesary functions. It only has an X and Y value, so for Vectors of
    * greater length, use the Matrix Class to create a 1xLength vector you want. (It has all the needed fucntions)
    *
    *
    * @since 0.0.0
    * @param {Int} the x location
    * @param {Int} the y location
    * @returns {Vector} the vector object
    *
    */
    function Vector(x=0 , y=0) {
      this.x = x
      this.y = y
    }

    /**
    *
    * Creates a new vector class
    *
    * @since 0.0.0
    * @param {Int} the x location
    * @param {Int} the y location
    * @returns {Vector} the vector object
    *
    */
    function createVector(x,y) {
      return new Vector(x,y)
    }

    /**
    *
    * Adds to this vector the given vector or an int
    *
    * @since 0.0.0
    * @param {*} the vector to add or the int to add to this vector's x and y
    *
    */
    Vector.prototype.add = function(n) {

      if (isClass(n, Vector)) {
        this.x += n.x; this.y += n.y
      } else {
        this.x += n; this.y += n
      }
    }

    /**
    *
    * Substracts from this vector the given vector or an int
    *
    * @since 0.0.0
    * @param {*} the vector to substract or the number to subract to this vector's x and y
    *
    */
    Vector.prototype.sub = function(n) {

      if (isClass(n, Vector)) {
        this.x -= n.x; this.y -= n.y
      } else {
        this.x -= n; this.y -= n
      }
    }

    /**
    *
    * Multiplies this vector's x and y by another vector's x and y or by a given number
    *
    * @since 0.0.0
    * @param {*} the vector to multiply or the number to multiply to this vector's x and y
    *
    */
    Vector.prototype.mul = function(n) {

      if (isClass(n, Vector)) {
        this.x *= n.x; this.y *= n.y
      } else {
        this.x *= n; this.y *= n
      }
    }

    /**
    *
    * Divides this vector's x and y by another vector's x and y or by a given number
    *
    * @since 0.0.0
    * @param {*} the vector to divide or the number to divide to this vector's x and y
    *
    */
    Vector.prototype.div = function(n) {

      if (isClass(n, Vector)) {
        this.x /= n.x; this.y /= n.y
      } else {
        this.x /= n; this.y /= n
      }
    }

    /**
    *
    * Returns the magnitude of this vector
    *
    * @since 0.0.0
    * @returns {Number} the magnitude
    *
    */
    Vector.prototype.mag = function() {
      let s = root( ( power(this.x,2) + power(this.y,2) ) , 2 )
      return s
    }

    /**
    *
    * Returns the magnitude of this vector but squared
    *
    * @since 0.0.0
    * @returns {Number} the magnitude squared
    *
    */
    Vector.prototype.magSq = function() {
      return power(this.mag(), 2)
    }

    /**
    *
    * Randomizes this vector's X and Y, between a given range
    *
    * @since 0.0.0
    *
    */
    Vector.prototype.randomize = function(s1,e1,s2,e2) {

      let start1 = (s2 == undefined) ? 0 : s1
      let end1 = (s2 == undefined) ? s1 : e1

      let start2 = (s2 == undefined) ? 0 : s2
      let end2 = (s2 == undefined) ? e1 : e2

      this.x = randint(start1, end1)
      this.y = randint(start2, end2)


    }

    /**
    *
    * Returns a cloned version of the vector
    *
    * @since 0.0.0
    * @returns {Vector} the clone of this vector
    *
    */
    Vector.prototype.clone = function() {
      return new Vector(this.x, this.y)
    }

    /**
    *
    * Normalizes this vector
    *
    * @since 0.0.0
    *
    */
    Vector.prototype.normalize = function() {
      let m = this.mag()
      this.x /= m
      this.y /= m
    }


    /**
    *
    * A static version of the 'add' functions for vectors
    *
    * @static
    * @since 0.0.0
    * @param {Vector} the vector to add up
    * @param {Vector} the vector to add up
    * @returns {Vector} the new vector
    *
    */
    Vector.add = function(v,w) {
      let x,y;
      if (isNumber(w)) {
        x = v.x + w
        y = v.y + w
      } else {
        x = v.x + w.x
        y = v.y + w.y
      }
      return createVector(x,y)

    }

    /**
    *
    * A static version of the 'sub' functions for vectors
    *
    * @static
    * @since 0.0.0
    * @param {Vector} the vector to substract
    * @param {Vector} the vector to substract
    * @returns {Vector} the new vector
    *
    */
    Vector.sub = function(v,w) {
      let x,y;
      if (isNumber(w)) {
        x = v.x - w
        y = v.y - w
      } else {
        x = v.x - w.x
        y = v.y - w.y
      }
      return createVector(x,y)

    }

    /**
    *
    * A static version of the 'mul' functions for vectors
    *
    * @static
    * @since 0.0.0
    * @param {Vector} the vector to multiply
    * @param {Vector} the vector to multiply
    * @returns {Vector} the new vector
    *
    */
    Vector.mul = function(v,w) {
      let x,y;
      if (isNumber(w)) {
        x = v.x * w
        y = v.y * w
      } else {
        x = v.x * w.x
        y = v.y * w.y
      }
      return createVector(x,y)

    }

    /**
    *
    * A static version of the 'div' functions for vectors
    *
    * @static
    * @since 0.0.0
    * @param {Vector} the vector to divide
    * @param {Vector} the vector to divide
    * @returns {Vector} the new vector
    *
    */
    Vector.div = function(v,w) {
      let x,y;
      if (isNumber(w)) {
        x = v.x / w
        y = v.y / w
      } else {
        x = v.x / w.x
        y = v.y / w.y
      }
      return createVector(x,y)
    }

    /**
    *
    * A static version of the 'normalize' functions for vectors
    *
    * @static
    * @since 0.0.0
    * @returns {Vector} the normalied version of the given vector
    *
    */
    Vector.normalize = function(v) {
      let m = v.mag()
      let w = createVector(v.x / m, v.y / m)
      return w
    }




    /**
    *
    * An alternative to the standard console. It allows the user to only log specific parts.
    *
    * @static
    * @since 0.0.0
    * @returns {out} the actual out object
    *
    */
    function out() {
      this.acces = ['all'];
      this.denied = [];
      this.pre = '';
      this.shouldLog = false;
    }

    /**
    *
    * For creating an out object, for convenience's sake.
    *
    * @static
    * @since 0.0.0
    * @returns {out} the actual out object
    *
    */
    function createOut() {
      return new out()
    }



    /**
    *
    * Prints out the given text if:
    *   the given key is in the acces keys
    *   the given key isn't in the denied keys
    *   if it should log or print anything
    *
    * @private
    * @param {datatype} the text to print
    * @param {string} the key
    *
    */
    out.prototype.log = function(text, key='all') {
      if (this.acces.includes(key) && !this.denied.includes(key) && !this.shouldLog) {
        console.log(this.pre + text)
      }
    }

    /**
    *
    * Sets the prefix for each message
    *
    * @static
    * @since 0.0.0
    * @param {string} the new prefix for each following log
    *
    */
    out.prototype.prefix = function(prefix="") {
      this.pre = prefix
    }

    /**
    *
    * Adds a key to this out's acces
    *
    * @static
    * @since 0.0.0
    * @param {string} the new key to add
    *
    */
    out.prototype.add = function(key) {
      if (Array.isArray(key)) {
        for (let i = 0; i < key.length; i++) {
          this.acces.push(key[i])
        }
      } else{
        this.acces.push(key)
      }
    }

    /**
    *
    * Removes a key by adding it to the denied array
    *
    * @static
    * @since 0.0.0
    * @param {string} the new key to add
    *
    */
    out.prototype.remove = function(key) {
    if (Array.isArray(key)) {
      for (let i = 0; i < key.length; i++) {
        this.denied.push(key[i])
      }
    } else{
      this.denied.push(key)
    }
  }

  /**
  *
  * Toggles whether or not it can print at all
  *
  * @static
  * @since 0.0.0
  *
  */
  out.prototype.stop = function() {
    this.shouldLog = !this.shouldLog
  }

  /**
  *
  * Removes an element from an array and then returns said array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array from wich to remove the given element
  * @param {*} the element to remove
  * @return {ARR} the new array
  *
  */
  function remove(arr, element) {

    if (!checkArgs([ARR] , arguments)) {return arr}

    let new_arr = []
    let removedElement = false

    for (let i = 0; i < arr.length;i++) {

      if (arr[i] == element && !removedElement) {
        removedElement = true
      } else {
        new_arr.push(arr[i])
      }

    }

    return new_arr

  }

  /**
  *
  * Removes an element on an index from an array and then returns said array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array from wich to remove the given index
  * @param {INT} the index to remove
  * @return {ARR} the new array
  *
  */
  function removeAt(arr, index) {

    if (!checkArgs([ARR,INT], arguments)) {return arr}

    let new_arr = []

    for (let i = 0; i < arr.length;i++) {
      if (i != index) {
        new_arr.push(arr[i])
      }
    }

    return new_arr

  }

  /**
  *
  * Loops through the given array and calls the callback function with as arguments
  * the element and index
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to remove
  * @param {FNC} the function to call
  *
  */
  function loop(arrr, cb = function(el, i) { console.log(el.toString() + ' : ' + i.toString()) }, check=true) {


    if (check) {if (!checkArgs([ARR,FNC] , arguments)) {return;}}

    if (isObject(arrr)) {
      let ks = getKeys(arrr)
      for (let i = 0; i < ks.length; i++) {
        cb(arrr[ks[i]], i)
      }
      return;
    }

    for (let i = 0; i < arrr.length; i++) {
      cb(arrr[i], i)
    }

  }

  /**
  *
  * Loops through the given array BACKWARDS and calls the callback function with as arguments
  * the element and index
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to remove
  * @param {FNC} the function to call
  *
  */
  function loopRight(arr, func=giveACallbackFunctionFunction, check=true) {

    if (check) {if (!checkArgs([ARR, FNC], arguments)) {return;}}

    for (let i = arr.length - 1; i >= 0; i--) {
      func(arr[i], i)
    }

  }

  /**
  *
  * Loops through the given double array and calls the given func with each element and the x and y pos in the double array
  *
  * @static
  * @since 0.0.0
  * @cat {Array}
  * @param {Array} the double array
  * @param {Function} the function to call
  *
  */
  function doubleLoop(dbl, cb = function(el, i ,j) { console.log(el.toString() + ' => ' + i.toString() + ' : ' + j.toString()) }) {

    for (let i = 0; i < dbl.length; i++) {
      for (let j = 0; j < dbl[0].length; j++) {
        cb(dbl[i][j],i,j)
      }

    }

  }

  /**
  *
  * Loops through the given double array BACKWARDS (starts at the bottom right) and calls the given func with each element and the x and y pos in the double array
  *
  * @static
  * @since 0.0.0
  * @cat {Array}
  * @param {Array} the double array
  * @param {Function} the function to call
  *
  */
  function doubleLoopRight(dbl, cb = function(el, i ,j) { console.log(el.toString() + ' => ' + i.toString() + ' : ' + j.toString()) }) {

    for (let i = dbl.length-1; i >= 0; i--) {
      for (let j = dbl[0].length-1; j >= 0; j--) {
        cb(dbl[i][j], i, j)
      }

    }

  }

  /**
  *
  * Takes two arrays and creates an array with the same length but the elements are swithced from
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the first array
  * @param {ARR} the second array
  * @returns {ARR} the combined array
  *
  */
  function combine(a,b) {
    if (!checkArgs([ARR,ARR], arguments)) {return a}
    if (!checkLength([a,b])) {return a}

    let c = []
    let f = true
    for (let i = 0; i < a.length; i++) {
      if (f) {
        c.push(a[i])
        f = false
      } else {
        c.push(b[i])
        f = true
      }
    }
    return c
  }

  /**
  *
  * Returns an array created from the two given that have the same length
  * each element is chosen randomly from either the first array or second
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the first array
  * @param {ARR} the second array
  $ @param {INT} the chance of an element of the first array to be chosen
  * @returns {ARR} the mixed array
  *
  * @example
  * arr1 = [1,1,1,1]
  * arr2 = [2,2,2,2]
  * _$.mix(arr1,arr2)
  * => [1,1,1,2]
  * => [2,2,1,1]
  * => [2,1,1,2]
  * => ...
  *
  */
  function mix(a, b, ch=50) {

    if (!checkArgs([ARR,ARR,NMR], arguments)) {return a}
    if (!checkLength([a,b])) {return a}

    if (a.length != b.length) {
      console.error('Given arrays need to have the same length.')
      return;
    }

    let c = []

    for (let i = 0; i < a.length; i++) {

      if (randint(0,100) < ch) {
        c.push(a[i])
      } else {
        c.push(b[i])
      }

    }
    return c

  }

  /**
  *
  * Picks a new place for each element of the given element
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to shuffle
  * @returns {ARR} the shuffled array
  *
  */
  function shuffle(a) {

    if (!checkArgs([ARR], arguments)) {return a}

    let shuffled = []
    let iter = a.length
    for (let i = 0; i < iter; i++) {
      let el = pick(a)
      a = remove(a, el)
      shuffled.push(el)
    }
    return shuffled
  }

  /**
  *
  * Picks a random element from the array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to pick an element from
  * @returns {*} the picked element
  *
  */
  function pick(a) {
    if (!checkArgs([ARR], arguments)) {return a}
    return a[randint(a.length-1)]
  }

  /**
  *
  * Creates an object from two given arrays
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array that contains the keys of the object
  * @param {ARR} the array that contains the values of the object
  * @return {OBJ} the objet
  *
  */
  function zip(keys, values) {

    if (!checkArgs([ARR,ARR], arguments)) {return keys}
    if (!checkLength([keys,values])) {return keys}  

    if (keys.length != values.length) {
      console.error('Given arrays must be of the same length.')
      return;
    }

    let obj = {}
    loop(keys, (el, i) => {
      obj[el] = values[i]
    })
    return obj
  }

  /**
  *
  * Returns an array of arrays that each contain the first element, the second element , ...
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARRS} the array of arrays that contain the data
  * @return {ARRS} the 
  *
  * @example
      _.unzip([ [quinten,cobe], [red, blue], [slim, grappig] ])
        => [ [quinten, red, slim], [cobe, blue, grappig] ]
  */
  function unzip(sources) {

    if(!checkArgs([ARRS], arguments)) {return sources}

    let unzipped = Array(sources[0].length)

    loop(sources, (el,i) => {

      loop(el, (ele, j) => {
          if (unzipped[j] == undefined) {
            unzipped[j] = [ele]
          } else {
            unzipped[j].push(ele)
          }
      })

    })

    return unzipped

  }




  /**
  *
  * Creates an array that starts at the min and end at max
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {INT} the start of the range
  * @param {INT} the end of the range
  * @return {ARR} the range as an array
  *
  */
  function getRange(start, end) {

    if (!( (isNumber(start) && end == undefined) || (isNumber(start) && isNumber(end)) )) {
      console.log(error('Given arguments should be of type : number, number '))
    }

    let min = (end == undefined) ? 0:start
    let max = (end == undefined) ? start:end
    let rang = []
    iterate(max-min, (i) => {
      rang.push(min+i)
    })
    return rang

  }

  /**
  *
  * Calls a given function the specified amount of times
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {INT} the amount of times to call the given function
  * @param {FNC} the function to call
  *
  */
  function iterate(iterations=10, cb=giveACallbackFunctionFunction) {

    if (!checkArgs([NMR, FNC], arguments)) {return iterations}

    for (let i = 0; i < iterations; i++) {
      cb(i)
    }
  }

  /**
  *
  * Maps each element of the array or the value of each key of the object
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {*} can be the array, number or object to map
  * @param {*} can be the map function or the start of the current range
  * @param {NMR} the end of the current range (optional)
  * @param {NMR} the start of the desired range (optional)
  * @param {NMR} the end of the desired range (optional)
  * @return {*} the mapped array or object or number
  *
  */
  function map(a,cb=function(v) {console.log('give a callback');return v;}, e1,s2,e2) {

    if (isArray(a) && isFunction(cb)) {

      let a_mapped = []

      loop(a, (el,i) => {
        a_mapped.push(cb(el))
      })

      return a_mapped;
    }

    if (isObject(a) && isFunction(cb)) {

      let a_mapped = {}
      let a_keys = Object.keys(a)

      for (let i = 0; i < a_keys.length; i++) {
        a_mapped[a_keys[i]] = cb(a[a_keys[i]])
      }

      return a_mapped;
    }

    if (isInt(a) || isFloat(a)) {
      return mapNumber(a, cb, e1, s2, e2)
    }

    console.warn('Given arguments for the map function were invalid.')


  }

  /**
  *
  * Assigns a given value from the given sources object to the given object
  *
  * @since 0.0.0
  $ @cat {ARR}
  * @param {OBJ} the object to map or ojects to assign
  * @param {OBJS} the sources from wich to get the values for the given object
  * @return {OBJS} the objects with the assigned values
  *
  */
  function assign(ob, sources) {

    
    if ( !(isObject(ob) || checkType(OBJS, ob)) || !(isObject(sources) || checkType(OBJS,sources))) {
      console.error('Given arguments should be of type : object or array of objects, object or array of objects')
    }


    let objs = ob;
    if (!isArray(objs)) {
      objs = [ob]
    }

    if (!isArray(sources)) {
      sources = [sources]
    }

    let results = []

    for (let i = 0; i < objs.length; i++) {

      let obj = objs[i]

      for (let j = 0; j < sources.length; j++) {

        let source_keys = getKeys(sources[j])

        for (let o = 0; o < source_keys.length; o++) {

          obj[source_keys[o]] = sources[j][source_keys[o]]

        }

      }

      results.push(obj)

    }

    return results






      



  }

  /**
  *
  * Assigns the values from the given (object) sources to the given object if the value isn't defined yet
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {OBJ} the object to map
  * @param {OBJS} the sources from wich to get the values for the given object
  * @return {OBJ} the object with the assigned values
  *
  */
  function assignEmpty(ob, sources) {


    if ( !(isObject(ob) || checkType(OBJS, ob)) || !(isObject(sources) || checkType(OBJS,sources))) {
      console.error('Given arguments should be of type : object or array of objects, object or array of objects')
    }


    let objs = ob;
    if (!isArray(objs)) {
      objs = [ob]
    }

    if (!isArray(sources)) {
      sources = [sources]
    }

    let results = []

    for (let i = 0; i < objs.length; i++) {

      let obj = objs[i]
      let objKeys = getKeys(obj)

      for (let j = 0; j < sources.length; j++) {

        let source_keys = getKeys(sources[j])

        for (let o = 0; o < source_keys.length; o++) {

          if (!objKeys.includes(source_keys[o])){
            obj[source_keys[o]] = sources[j][source_keys[o]]
          }
        }

      }

      results.push(obj)

    }

    return results

  }

  /**
  *
  * Returns all the objects that have all key-value pairs that match with the given object
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {OBJS} the array of objects to
  * @param {OBJ} the keys and values to look for
  * @return {OBJS} the objects that match the given object
  *
  */
  function match(objects , obj) {

    if (!checkArgs([OBJS, OBJ], arguments)) {return objects}

    let matchedObjects = []
    let objKeys = getKeys(obj)

    loop(objects , (el , i) => {
      let elKeys = getKeys(el)
      let f = 0
      loop(elKeys, (key, j) => {
        if (objKeys.includes(key)) {
          if (obj[key] == el[key]) {
            f+=1
          }
        }
      })

      if (f == objKeys.length) {matchedObjects.push(el)}

    })

    return matchedObjects

  }

  /**
  *
  * Same as match but, returns the objects that have any of the given keys in common
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {OBJS} the array of objects to match any
  * @param {OBJ} the keys and values to look for
  * @return {OBJS} the objects that have any of the key-value pairs in common with the given object
  *
  */
  function matchAny(objects , obj) {

    if (!checkArgs([OBJS, OBJ], arguments)) {return objects}

    let matchedObjects = []
    let objKeys = getKeys(obj)

    loop(objects , (el , i) => {
      let elKeys = getKeys(el)
      let f = false
      loop(elKeys, (key, j) => {
        if (objKeys.includes(key)) {
          if (obj[key] == el[key]) {
            f = true
          }
        }
      })

      if (f) {matchedObjects.push(el)}

    })

    return matchedObjects

  }

  /**
  *
  * Goes though an array and returns the value that passes the test (returns true)
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to go through
  * @param {FNC} the array to test each element with
  * @return {*} the element or {ARR}
  *
  */
  function find(arr, cb=function(v) {return false}) {

    if (!checkArgs([ARR, FNC], arguments)) {return arr}

    let result = []
    loop(arr, (el, i) => {
      if (cb(el)) {
        result.push(el)
      }
    })
    return result
  }

  /**
  *
  * Goes though an array and returns true if each value returns true (the given functon)
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to go through
  * @param {FNC} the array to test each element with
  * @return {BLN} whether or not all the values returned true
  *
  */
  function findAll(arr, cb=function(v){return false}) {

    if (!checkArgs([ARR, FNC], arguments)) {return false}

    let result = true
    loop(arr, (el) => {

      result = result && cb(el)

    })
    return result

  }

  /**
  *
  * Goes though an array and returns true if one value returns true (the given functon)
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {ARR} the array to go through
  * @param {FNC} the array to test each element with
  * @return {BLN} whether or not one the values returned true
  *
  */
  function findAny(arr, cb=function(v){return false}) {

    if (!checkArgs([ARR, FNC], arguments)) {return false}


    let result = false
    loop(arr, (el) => {

      result = result || cb(el)

    })
    return result

  }

  /**
  *
  * Returns the first element of an array (or the given amount starting from the start)
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {ARR} the array to
  * @param {INT} the amount of elements to go through
  * @return {*} the first element or {ARR}
  *
  */
  function first(arr, n=-1) {

    if (n == -1) {arguments[1] = -1;arguments.length = 2}
    if (!checkArgs([ARR, INT], arguments)) {return arr[0]}

    if (n == -1) {
      return arr[0]
    } else {
      let elements = []

      loop(arr, (el, i )  => {
        if (i < n ) {
          elements.push(el)
        }
      })

      return elements

    }
  }


  /**
  *
  * Returns the laast element of an array (or the given amount starting from the end)
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {ARR} the array to
  * @param {INT} the amount of elements to go through
  * @return {*} the last element
  *
  */
  function last(arr, n=-1) {

    if (n == -1) {arguments[1] = -1;arguments.length = 2}
    if (!checkArgs([ARR, INT], arguments)) {return arr[0]}

    if (n == -1) {
      return arr[arr.length-1]
    } else {
      let elements = []

      loopRight(arr, (el, i )  => {
        if (arr.length - 1 - i < n ) {
          elements.push(el)
        }
      })

      return elements.reverse()

    }
  }

  /**
  *
  * Returns a part of the array
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {ARR} the array to splice
  * @param {INT} the start of the elements to return
  * @param {INT} the end of the elements to return
  * @return {ARR} the elements of the array
  *
  */
  function splice(arr, st, ed) {

    if (!checkArgs([ARR,INT,INT] , arguments)) {return arr}

    let elements = []
    loop(arr , (el,i) => {

      if (i >= st && i <= ed) {
        elements.push(el)
      }

    })

    return elements

  }

  /**
  *
  * Returns the array without the specified part
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {ARR} the array to spliceWithout
  * @param {INT} the start of the elements to cut out
  * @param {INT} the end of the elements to cut
  * @return {ARR} the remaining elements of the array
  *
  */
  function spliceWithout(arr, st, ed, errorcheck=true) {
    if (errorcheck) {
      if (!checkArgs([ARR,INT,INT], arguments)) {return arr}
    }

    let elements = []
    loop(arr , (el,i) => {

      if (i < st || i > ed) {
        elements.push(el)
      }

    },false)

    return elements

  }

  

  /**
  *
  * Returns the element at the index of the array even if the given value is too big
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {ARR} the array
  * @param {INT} the index
  * @return {*} the element at the index
  *
  */
  function boundIndex(arr , i) {

    if (!checkArgs([ARR, INT], arguments)) {return arr}

    return arr[i%arr.length]
  }

  /**
  *
  * Returns the keys of the given object
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {OBJ} the object that contains the keys to return
  * @return {ARR} the keys of of the object
  *
  */
  function getKeys(object) {
    
    if (! isObject(object)) {
      console.error('Given arguments should of type : object')
    }

    return Object.keys(object)

  }

  /**
  *
  * Returns the values of the keys of the given object
  *
  * @since 0.0.0
  * cat {ARR}
  * @param {OBJ} the object that contains the values to return
  * @return {ARR} the values of of the object
  *
  */
  function getValues(object) {
    if (! isObject(object)) {
      console.error('Given arguments should of type : object')
    }
    let vs = []
    let ks = getKeys(object)
    loop(ks, (el, i) => {
      vs.push(object[el])
    })
    return vs

  }

  /**
  *
  * Returns the highest number in the array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to pick the highest number from
  * @returns {INT} the highest number in the array
  *
  */
  function max(arr, func) {


    if (!(checkArgs([ARR], arguments) || checkArgs([OBJ,FNC], arguments))) {return arr}

    let m = -Infinity

    if(isObject(arr[0]) && isFunction(func)) {

      loop(arr, (obj, i ) => {

        let v = func(obj)

        if (m == -Infinity) {
          m = obj
        } else if ( v > func(m) ) {
          m = obj
        }


      })

      return m


    }

    loop(arr, (el) => {
      if (el > m) {
        m = el
      }
    })
    return m
  }

  /**
  *
  * Returns the lowest number in the array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to pick the lowest number from
  * @returns {INT} the lowest number in the array
  *
  * @example
  *    let stooges = [{name:'bob', age:50}, {name:'donald', age:25}]
  *
  *    _.min(stooges, (stooge) => {return stooge.age} )
  *      => {name: "donald", age: 25}
  *   --------------------------------------------
  *    _.min([5,12,6,0,23,89])
  *      => 0
  */
  function min(arr, func) {
    if (!(checkArgs([ARR], arguments) || checkArgs([OBJ,FNC], arguments))) {return arr}
      
    let m = Infinity

    if(isObject(arr[0]) && isFunction(func)) {

      loop(arr, (obj, i ) => {

        let v = func(obj)

        if (m == Infinity) {
          m = obj
        } else if ( v < func(m) ) {
          m = obj
        }
      })
      return m
    }
    loop(arr, (el) => {
      if (el < m) {
        m = el
      }
    })
    return m
  }

  /**
  *
  * Goes through an array of obects and returns all the values of the given key
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {OBJS} the arraya of objects to go through
  * @returns {ARR} an array of values
  *
  */
  function pluck(objects, key) {

    if (!checkArgs([OBJS], arguments)) {return objects}

    let plucked = []
    loop(objects, (obj ,i) => {
      plucked.push(obj[key])
    })
    return plucked

  }

  /**
  *
  * Returns the given array without the second given array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array
  * @param {ARR} the elements that can't be in the first array
  * @returns {ARR} the first array wihtout the elements of the second array
  *
  */
  function without(arr, wtt) {

    if (!checkArgs([ARR,ARR],arguments)) {return arr}


    let new_arr = []
    loop(arr, (el , i ) => {

      if (!wtt.includes(el)) {
        new_arr.push(el)
      }

    })

    return new_arr

  }

  /**
  *
  * Returns the given array but only with the values that pass the true test
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array
  * @param {FNC} the function that will decide whether or not the element can stay
  * @returns {ARR} the elements that pass the true test
  *
  *
  */
  function withoutBy(arr, wttFunc=function(){giveACallbackFunctionFunction();return true;}) {
    if (!checkArgs([ARR,FNC],arguments)) {return arr}
      
    let new_arr = []
    loop(arr, (el , i ) => {

      if (!wttFunc(el)) {
        new_arr.push(el)
      }

    })

    return new_arr

  }

  /**
  *
  * Returns an array of values that return true and one that returns false
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array
  * @param {FNC} the function that will decide whether or not the element can stay
  * @returns {ARRS} the elements that pass the true test and the ones that didn't
  *
  * @example
      let l = [1,2,3,4,5,6,7,8,9,10]
      console.log(_.partition(l, (n) => {return n%2==0}))
        => [ [2, 4, 6, 8, 10], [1, 3, 5, 7, 9] ]
  *
  *
  *
  */
  function partition(arr , func) {
    if (!checkArgs([ARR,FNC],arguments)) {return arr}
     
    let tr = [], fl = []

    loop(arr, (el) => {
      if (func(el)) {
        tr.push(el)
      } else {
        fl.push(el)
      }
    })

    return [tr, fl]



  }

  /**
  *
  * Connects the given arrays to make one array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARRS} the arrays to connect
  * @returns {ARR} an connected array of all the array
  *
  * @example
      _.connect([  [5,8,6], [1,6,4], [6,2,3], [1,2,3]  ])
        => [5, 8, 6, 1, 6, 4, 6, 2, 3, 1, 2, 3]
  *
  *
  *
  */
  function connect(ar) {

    if (!checkArgs([ARRS], arguments)) {return ar}

    let new_arr = []

    loop(ar, (el,i) => {

      loop(el, (l, j) => {
        new_arr.push(l)
      })

    })

    return new_arr

  }

  /**
  *
  * Inserts a value at the beginning of an array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to insert the value in
  * @param {*} the value to insert in the array
  * @returns {ARR} the array with the element inserted
  *
  * @example
      _.insert([1,2,3,4,5] , 0)
        => [0, 1, 2, 3, 4, 5]
  *
  *
  *
  */
  function insert(arr, element) {

    if (!(checkArgs([ARR], arguments) || checkArgs([ARR, ARR] ,arguments))) {return arr}


    arr.unshift(element)
    return arr

  }

  /**
  *
  * Inserts a value at the given index of an array (this will cause the element already at this index to shift one to the right)
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to insert the value in
  * @param {*} the value to insert in the array at the specified index
  * @returns {ARR} the array with the element inserted
  *
  * @example
      _.insertAt([1,2,3,4,5], 6, 0)
        => [6, 1, 2, 3, 4, 5]
  *
  *
  *
  */
  function insertAt(array, element, index) {

    if (!checkArgs([ARR, LOL, INT], arguments)) {return array}

    let new_arr = []

    loop(array, (el, i) => {
      if (i == index) {
        new_arr.push(element)
      }
      new_arr.push(el)
    })

    return new_arr

  }

  /**
  *
  * Inserts a value at the end of an array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to insert the value in
  * @param {*} the value to insert in the array
  * @returns {ARR} the array with the element inserted
  *
  * @example
      _.insertRight([1,2,3,4,5], 6)
        => [1, 2, 3, 4, 5, 6]
  *
  *
  *
  */
  function insertRight(array, element) {

    if (!checkArgs([ARR, LOL], arguments)) {return array}

    let new_arr = Array.from(array)
    new_arr.push(element)
    return new_arr

  }

  /**
  *
  * Inserts a given array at the specified index
  *
  * @since 1.0.0
  * @cat {ARR}
  * @param {ARR} the array to insert the other array in
  * @param {ARR} the array to insert
  * @returns {ARR} the array with the arr inserted
  *
  * @example
      _.insertArrayAt([1,2,3,6,7], [4,5], 3)
        => [1, 2, 3, 4, 5, 6, 7]
  *
  *
  */
  function insertArrayAt(arr, arr2, index) {

    if (!checkArgs([ARR,ARR,INT], arguments)) {return arr;}
    let new_arr = []


    for (let i = 0; i < arr.length; i++) {

      if (i == index) {
        for (let j = 0; j < arr2.length; j++) {
          new_arr.push(arr2[j])
        }
        new_arr.push(arr[i])
      } else {
        new_arr.push(arr[i])
      }

    }


    return new_arr


  }


  /**
  *
  * Clones a given var
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the thing to clone
  * @returns {*} a clone of the var
  *
  */
  function clone(v) {
    if (isDoubleArray(v)) {
      let new_arr = array(v.length)
      loop(new_arr, (el, i) => {
        new_arr[i] = Array.from(v[i])
      })
      return new_arr
    }

    if (isArray(v)) {
      return Array.from(v)
    }
    if (isObject(v)) {
      let ks = getKeys(v)
      let vs = getValues(v)
      let obj = zip(ks,vs)
      return obj
    }
    if (isClass(v,Vector)) {
      return v.clone()
    }
    if (isClass(v,Matrix)) {
      return v.clone()
    }
    return v
  }

  /**
  *
  * Memorizes all the returned values of a function
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {FNC} the function to merosize the result from
  * @returns {FNCS} the function that the user should call
  *
  */
  function memorize(func) {

    if (!checkArgs([FNC],arguments)) {return func}

    let nm = func.name
    memorizedFunctionResult[nm] = []


    let f = function() {
      let fn = nm
      let result = func(...arguments)
      memorizedFunctionResult[fn].push({argu:Array.from(arguments), returned:result})
      return result
    }

    return f

  }

  /**
  *
  * Returns all the memorized values of a function
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {FNC} the function to get result from
  * @returns {ARR} the values the function returned
  *
  */
  function getMemorized(func) {
    if (!checkArgs([STR], arguments)) {return func}
    let fn = func
    return memorizedFunctionResult[fn]

  }


  /**
  *
  * Sorts a given array or object
  *
  * @since 0.0.0
  * cat {FNC}
  * @param {*} the array or object to sort
  * @returns {*} returns the sorted array or object
  *
  */
  function sort(n) {

    if (!(isArray(n) || isObject(n) || checkType(STRS,n))) {
      console.error('Given arguments should be : array of numbers or object or array of strings ')
    }

    if (isObject(n) && !isArray(n)) {
      let ks = getKeys(n)
      let obj = {}
      let ks_sorted = sort(ks,false)

      for (let el of ks_sorted) {
        obj[el] = n[el]
      }

      return obj

    }

    if(isString(n[0])) {
      return n.sort()
    } else {

      return mergeSort(n)

    }
  }

  /**
  *
  * Changes the values and keys of an object
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {OBJ} the object to invert
  * @returns {OBJ} the inverted object
  *
  */
  function invert(n) {

    let ks = getKeys(n)
    let vs = getValues(n)
    let obj = zip(vs, ks)
    return obj

  }

  /**
  *
  * Returns true if the given value is between the given range
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {NMR} the value to check the range of
  * @param {NMR} the start or end(if only one other vvlaue is given)
  * @param {NMR} the end of the range
  * @returns {BLN} whether or not the value is in the given range
  *
  */
  function inRange(v, s, e) {
    let r1 = (e == undefined) ? 0 : s
    let r2 = (e == undefined) ? s : e

    if (v >= r1 && v <= r2) {return true} else {return false}

  }

  /**
  *
  * Removes all falsey values from a given array
  * values are : undefined, false, null, 0, '', NaN
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array to remove all the falsey from
  * @returns {ARR} the array with falsey values removed
  *
  */
  function compact(arr) {

    if (!checkArgs([ARR], arguments)) {return arr}

    let new_arr = []

    loop(arr , (el) => {
      if (el != undefined && el != null && el != false && el != 0 && !isNaN(el) && el != '') {
        new_arr.push(el)
      }
    })

    return new_arr

  }


  /**
  *
  * Returns a random float between the given range (if only one param is given),
  * min is 0 and max is given param
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {NMR} the min value of the random number
  * @param {NMR} the max value of the random number
  * @returns {NMR} the random value
  *
  */
  function randfloat(r1,r2) {

    let min = (r2 == undefined) ? 0:r1
    let max = (r2 == undefined) ? r1:r2

    return Math.random() * (max - min) + min

  }

  /**
  *
  * Returns a random boolean value
  *
  * @since 0.0.0
  * @cat {FNC}
  * @returns {BLN} the random bool value
  *
  */
  function randBool() {

    let bool = (randint(1) == 1) ? true : false
    return bool

  }

  /**
  *
  * Returns a random string with a given length
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {INT} the length of the random string
  * @returns {STR} the random string
  *
  */
  function randstring(length) {

    let st = ''

    for (let i = 0; i < length; i++) {
      st += randchar()
    }

    return st

  }

  /**
  *
  * Returns a random char from the normal alphabet
  *
  * @since 0.0.0
  * @cat {FNC}
  * @returns {STR} the random char
  *
  */
  function randchar() {
    let alphabet = getAlphabet()

    return alphabet[randint(0,25)]

  }

  /**
  *
  * Returns a random int between the given range (if only one param is given),
  * min is 0 and max is given param
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {INT} the min value of the random number
  * @param {INT} the max value of the random number
  * @returns {INT} the random value
  *
  */
  function randint(r1,r2) {

    let min = (r2 == undefined) ? 0:r1
    let max = (r2 == undefined) ? r1:r2

    return round(randfloat(r1,r2))

  }

  /**
  *
  * Returns the rounded version of the given float number
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {FLT} the number to round off
  * @returns {INT} the rounded number
  *
  */
  function round(n, decimals=0) {


    return Math.round(n * Math.pow(10, decimals))/ Math.pow(10, decimals);
  }

  /**
  *
  * Returns the alphabet in array form
  *
  * @since 0.0.0
  * @cat {STR}
  * @returns {ARR} the alphabet
  *
  */
  function getAlphabet() {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  }

  /**
  *
  * Returns an empty space
  *
  * @since 0.0.0
  * cat {STR}
  * @param {INT} the amount of empty spaces
  * @returns {STR} the empty string
  *
  */
  function getEmpty(a) {
    if (!checkArgs([INT], arguments)) {return '  '}

    let s = ''
    iterate(a, () => {
      s+=' '
    })
    return s
  }

  /**
  *
  * Returns an array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {INT} the amount of elements the array should have
  * @param {FNC} a function can be provided to fill the array
  * @returns {ARR} the array
  *
  */
  function array(n, func) {

    if (!checkArgs([INT], arguments)) {return n}

    let arr = []

    if (isFunction(func)) {

      iterate(n, () => {
        arr.push(func())
      })

      return arr
      
    }

    iterate(n, () => {
      arr.push(undefined)
    })

    

    return arr

  }

  /**
  *
  * Returns a two dimensional or 'grid'-like array
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {INT} the width of the grid
  * @param {INT} the heihgt of the grid
  * @param {FNC} a function can be provided to fill the array
  * @returns {ARR} the array, the double array :D
  *
  */
  function doubleArray(x,y,func) {

    if (!checkArgs([INT,INT], arguments)) {return x}

    let arr = array(x , () => {return array(y,func)})
    return arr
  }

  /**
  *
  * Properly logs a double array
  *
  * @since 0.0.0
  * @cat {ARR}
  *
  */
  function printDoubleArray(dblArr) {

    if (!isDoubleArray(dblArr)) {
      if (!isClass(dblArr, Matrix)) {
        console.error('Given arguments should be : doubleArray')
      }
      
    }

    let s = ''
    let collwidth = 7
    for (let y = 0; y < dblArr[0].length; y++) {

      s += '\n'
      for (let x = 0; x < dblArr.length; x++) {
        let value = str(dblArr[x][y])
        s+= '|' + value + getEmpty(collwidth - value.length)
        if (x == dblArr.length-1) {s+='|'}
      }
    }

    print(s)
    return s

  }

  /**
  *
  * Clamps or contains a given value between a certain range
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {NMR} the value to clamp
  * @param {NMR} the clamp min
  * @param {NMR} the clamp max
  * @returns {NMR} the clamped value
  *
  */
  function clamp(n , min, max) {
    if (!checkArgs([NMR,NMR,NMR], arguments)) {return n}
    if (n >= min && n <= max) {
      return n
    }
    if (n < min) {
      return min
    }
    if (n > max) {
      return max
    }

  }

  /**
  *
  * Removes all the given char characters from a string and replaces them with given char
  *
  * @since 0.0.0
  * @cat {STR}
  * @param {STR} the string to remove the characters from
  * @param {STRS} the characters to remove
  * @param {STR} the replacement for the removed characters
  * @returns {STR} the string with characters removed
  *
  */
  function strip(s, chars, repl=' ') {
    if (!checkArgs([STR,STRS,STR], arguments)) {return s}
    let ns = ''

    loop(s , (el,i) => {

      if (!chars.includes(el)) {
        ns+=el
      } else {
        ns += repl
      }

    },false)
    return ns

  }

  /**
  *
  * Removes the given combinations of characters from a given str and replaces them
  *
  * @since 0.0.0
  * @cat {STR}
  * @param {STR} the string to remove the characters from
  * @param {ARR} the 'words' to remove
  * @param {STR} the characters or string to replace the removed strigns with
  * @returns {STR} the string with characters removed
  *
  */
  function cut(sentence, wtr, repl) {
    let s = ''
    let c = []

    for (let i = 0; i < wtr.length; i++) {
      c.push( {word:wtr[i], index: sentence.indexOf(wtr[i] ), length:wtr[i].length} )
    }

    console.log(c)
    let count = 0;

    for (let i = 0; i < sentence.length; i++) {
      let char = sentence[i]
      

      for (let j = 0; j < c.length; j++) {

        if (i == c[j].index) {
          count = c[j].length
          s += repl
        }

      }

      if (count == 0) {
        s += char
      } else {
        count--;
      }

    }
    return s
  }

  /**
  *
  * Returns a string from an array
  *
  * @since 0.0.0
  * cat {STR}
  * @param {ARR} the array to convert to a string
  * @param {STR} an optional separator between each element
  * @returns {STR} each element of the array
  *
  */
  function fromArray(arr, sepa='') {
    let s = ''
    loop(arr, (el,i) => {
      s += str(el)
      if (i != arr.length - 1) {s+=sepa}
    },false)
    return s
  }

  /**
  *
  * Returns true if given param is an array
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to check
  * @returns {BLN} the whether or not given param is a array
  *
  */
  function isArray(n) {
    return Array.isArray(n)
  }

  /**
  *
  * Returns true if given param is an int
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to check
  * @returns {BLN} the whether or not given param is a int
  *
  */
  function isInt(n) {
    return typeof n == 'number' && isFloat(n) == false
  }

  /**
  *
  * Returns true if given param is a number
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to check
  * @returns {BLN} the whether or not given param is a number
  *
  */
  function isNumber(n) {
    return isInt(n) || isFloat(n)
  }

  /**
  *
  * Returns true if given param is an float
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to check
  * @returns {BLN} the whether or not given param is a float
  *
  */
  function isFloat(n) {
    return typeof n == 'number' && (n.toString()).includes('.')
  }

  /**
  *
  * Returns true if given param is a string
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variablBLNe to check
  * @returns {BLN} the whether or not given param is a string
  *
  */
  function isString(n) {
    return typeof n == 'string'
  }

  /**
  *
  * Returns true if given param is a boolen
  *
  * @since 0.0.0
  * @cat {FNC}  
  * @param {*} the variable to check
  * @returns {BLN} the whether or not given param is a boolen
  *
  */
  function isBool(n) {
    return typeof n == 'boolean'
  }

  /**
  *
  * Returns true if given param is even
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {INT} the variable to check or the array to check
  * @returns {BLN} the whether or not given param is even
  *
  */
  function isEven(n) {

    // print('is ' + str(n) + ' even?')
    if (!(isArray(n) || isNumber(n))) {
      console.error('Given arguments should be of type : array or number')
    }

    if (isArray(n)) {
      return isEven(n.length)
    }
    if (n < 0) {return isEven(-n)}
    return n % 2 == 0
  }

  /**
  *
  * Returns true if given param is odd
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {INT} the variable to check or the array to check
  * @returns {BLN} the whether or not given param is odd
  *
  */
  function isOdd(n) {
    if (!(isArray(n) || isNumber(n))) {
      console.error('Given arguments should be of type : array or number')
    }
    return !isEven(n)
  }

  /**
  *
  * Returns true if given param is a object
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to check
  * @returns {BLN} the whether or not given param is a object
  *
  */
  function isObject(n) {
    return typeof n == 'object'
  }

  /**
  *
  * Returns true if given param is a doubleArray
  *
  * @since 0.0.0
  * @param {*} the variable to check
  * @returns {Bool} the whether or not given param is a doubleArray
  *
  */
  function isDoubleArray(n) {

    let isDbl = isArray(n)

    if (isDbl) {

      loop(n, (el) => {
        isDbl = isArray(el) && isDbl
      })
      return isDbl

    }

    return isDbl

  }


  /**
  *
  * Returns true if given param is a function
  *
  * @since 0.0.0
  * @param {*} the variable to check
  * @returns {Bool} the whether or not given param is a function
  *
  */
  function isFunction(n) {
    return typeof n == 'function'
  }

  /**
  *
  * Returns true if given param is a instanceof a given class
  *
  * @since 0.0.0
  * @param {*} the variable to check
  * @returns {Bool} the whether or not given param is an instance
  *
  */
  function isClass(n, cls) {
    return n instanceof cls
  }

  /**
  *
  * Converts a given var to an int even elements inside arrays inside this array
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to convert
  * @returns {INT} the int version of the var
  *
  */
  function int(v) {
    if (isArray(v)) {

      let nw = []
      loop(v, (el) => {
        nw.push(int(el))
      })
      return nw
    }

    if (isObject(v)) {
      let vs = getValues(v)
      let vs_int = int(vs)
      let ks = getKeys(v)
      let obj = zip(ks, vs_int)
      return obj
    }

    if(isBool(v)) {
      if (v==true) {return 1} else {return 0}
    }

    if (v == undefined) {return 0}
    if (v == NaN) { return 0}

    return parseInt(v)

  }

  /**
  *
  * Converts a given var to an string even elements inside arrays inside this array
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the variable to convert
  * @returns {STR} the string version of the var
  *
  */
  function str(v) {

    if (isArray(v)) {

      let nw = []
      loop(v, (el) => {
        nw.push(str(el))
      })
      return nw
    }

    if (isObject(v)) {
      let vs = getValues(v)
      let vs_str = str(vs)
      let ks = getKeys(v)
      let obj = clone(v)
      loop(ks, (el, i) => {
        obj[el] = vs_str[i]
      })

      return obj

    }

    if (v == undefined) {return 'undefined'}

    return v.toString()

  }

  /**
  *
  * Returns the values in each array that the other doesn't have
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} an array containing the elements to check
  * @param {ARR} the other array containing the elements to check
  * @returns {ARR} the different values in each array
  *
  */
  function difference(arr, arr2, rep=true) {
    if (!checkArgs([ARR,ARR],arguments)) {
      return arr
    }
    let new_arr = []

    loop(arr, (el, i ) => {
      let different = true
      loop(arr2, (el1, i1) => {

        if (el == el1) {different = false}

      })

      if (different) {
        new_arr.push(el)
      }

    })

    if (rep) {
      new_arr = extend(new_arr, difference(arr2,arr,false))
    }
    return new_arr
  }

  /**
  *
  * The same as 'difference', but passes each value through a given function first
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} an array containing the elements to check
  * @param {ARR} the other array containing the elements to check
  * @returns {ARR} the different values in each array
  *
  */
  function differenceBy(arr, arr2, func=(n)=>{return n}, rep=true) {
    let new_arr = []

    if (!checkArgs([ARR,ARR,FNC],arguments)) {
      console.log('dfkl')
      return arr
    }

    loop(arr, (el, i ) => {
      let different = true
      loop(arr2, (el1, i1) => {
        if (func(el) == func(el1)) {different = false}

      })
      if (different) {
        new_arr.push(el)
      }

    })

    if (rep) {
      new_arr = extend(new_arr, differenceBy(arr2,arr,func,false))
    }
    return new_arr
  }

  /**
  *
  * Returns all the funcions of an object
  *
  * @since 0.0.0
  * @cat {OBJ}
  * @param {OBJ} the oject to get the functions from
  * @returns {ARR} the array of all the functions
  *
  */
  function getFunctions(obj) {
    if (!checkArgs([OBJ], arguments)) {return obj}
    let fcs = []
    let ks = getKeys(obj)
    loop(ks, (key, i) => {
      if (isFunction(obj[key])) {fcs.push(key)}
    })

    return fcs
  }

  /**
  *
  * Returns the exponent of a given number (standard is ten)
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {NMR} the base
  * @param {NMR} the exponent
  * @returns {NMR} the result
  *
  */
  function power(n , e=2) {
    if (!checkArgs([NMR, NMR], [n ,e])) {return n}
    return Math.pow(n, e)
  }

  /**
  *
  * Returns the root of a given number (standard is 2)
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {NMR} the base
  * @param {NMR} the root
  * @returns {NMR} the result
  *
  */
  function root(n , r=2) {
    if (!checkArgs([NMR, NMR], [n ,r])) {return n}
    return power(n , 1/r)
  }

  /**
  *
  * Prints out a given var
  *
  * @since 0.0.0
  * @cat {FNC}
  * @param {*} the var to print out
  *
  */
  function print(s) {
    console.log(s)
  }

  /**
  *
  * Returns the closest greater int of a given number
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {NMR} the number to ceil
  * @returns {INT} the ceiled value of the given number
  *
  */
  function ceil(n) {
    if (!checkArgs([NMR], [n])) {return n}
    return Math.ceil(n)
  }

  /**
  *
  * Returns the closest lower int of a given number
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {NMR} the number to floor
  * @returns {INT} the floored value of the given number
  *
  */
  function floor(n) {
    if (!checkArgs([NMR], arguments)) {return n}
    return Math.floor(n)
  }

  /**
  *
  * Returns the absolute value of the given number
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {NMR} the number
  * @returns {NMR} the absolute value of the number
  *
  */
  function abs(n) {
    if (!checkArgs([NMR], arguments)) {return n}
    return Math.abs(n)
  }

  /**
  *
  * Returns the average of a given set of numbers
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {ARR} the numbers to find the average of
  * @returns {NMR} the average
  *
  */
  function average(arr) {
    if(!checkArgs([ARR], arguments)) {return arr}
    return sumDiv(arr , arr.length)
  }

  /**
  *
  * Returns the sum of a given set of numbers
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {ARR} the numbers to find the sum of
  * @returns {NMR} the total sum
  *
  */
  function sum(arr) {
    if(!checkArgs([ARR], arguments)) {return arr}
    let sum = 0
    loop(arr, (el) => sum+=el)
    return sum
  }

  /**
  *
  * Returns the sum of a given set of numbers divided by a given number
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {ARR} the numbers to find the sum of
  * @param {NMR} the value to divide the sum by
  * @returns {NMR} the total sum
  *
  */
  function sumDiv(arr, div=1) {
    if(!checkArgs([ARR, NMR], arguments)) {return arr}
    return sum(arr) / div
  }

  /**
  *
  * Returns the median of a given set of numbers
  *
  * @since 0.0.0
  * @cat {MATH}
  * @param {ARR} the numbers to find the median of
  * @param {BLN} whether or not the array is already sorted
  * @returns {NMR} the median
  *
  */
  function median(arr, isSorted=false) {
    arguments[1] = isSorted
    arguments.length++;
    if (!checkArgs([ARR,BLN], arguments)) {return arr}

    if (!isSorted) {
      arr = sort(arr)
    }

    if (arr.length % 2 == 0) {
      return (arr[arr.length/2] + arr[arr.length/2-1]) / 2
    } else {
      return arr[floor(arr.length/2)]
    }


  }

  /**
  *
  * Returns the year, month and day in stringified form
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {STR} the day, month, year
  *
  */
  function getDate() {
    return gDt('str', 'date')
  }

  /**
  *
  * Returns the current time in stringified form
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {STR} the hours, minutes, seconds
  *
  */
  function getTime() {
    return gDt('str', 'time')
  }

  /**
  *
  * Returns the current time in array form
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {ARR} the hours, minutes, seconds
  *
  */
  function getTimeAsArray() {
    return gDt('arr', 'time')
  }

  /**
  *
  * Returns the current date in array form
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {ARR} the days, months, years
  *
  */
  function getDateAsArray() {
    return gDt('arr', 'date')
  }

  /**
  *
  * Returns the current year
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current year
  *
  */
  function getYear() {
    return gDt('year')
  }

  /**
  *
  * Returns the current month
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current month
  *
  */
  function getMonth() {
    return gDt('month')
  }

  /**
  *
  * Returns the current daye
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current day
  *
  */
  function getDay() {
    return gDt('day')
  }

  /**
  *
  * Returns the current hour
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current hour
  *
  */
  function getHours() {
    return gDt('hours')
  }

  /**
  *
  * Returns the current minute
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current minute
  *
  */
  function getMinutes() {
    return gDt('minutes')
  }

  /**
  *
  * Returns the current second
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current second
  *
  */
  function getSeconds() {
    return gDt('seconds')
  }

  /**
  *
  * Returns the current milisecond
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the current milisecond
  *
  */
  function getMilli() {
    return gDt('mili')
  }

  /**
  *
  * Returns the amout of miliseconds that have passes since January first 1970
  *
  * @since 0.0.0
  * @cat {DATE}
  * @returns {INT} the amount of miliseconds
  *
  */
  function getEpoch() {
    return gDt()
  }

  /**
  *
  * Extends a given array by another arr and a given object with another object
  *
  * @since 0.0.0
  * @cat {ARR}
  * @param {ARR} the array
  * @param {ARR} the array to add to the other array
  * @returns {ARR} the combined arrays
  *
  */
  function extend(arr, arr2) {

    if ( ! ((isArray(arr) && isArray(arr2)) || (isObject(arr) && isObject(arr2)))) {
      console.error('Given arguments should be of type : array or object, array or object' )
    }

    if (isArray(arr)) {return arr.concat(arr2)}
    if (isObject(arr)) {

      let ks = getKeys(arr2)

      loop(ks, (key) => {
        arr[key] = arr2[key]
      })

      return arr
    }
  }

  // variables
  brief.version = version
  // methods
  brief.out = out
  brief.Collection = Collection
  brief.Vector = Vector
  brief.Matrix = Matrix
  brief.extend = extend
  brief.compact = compact
  brief.difference = difference
  brief.differenceBy = differenceBy
  brief.createCollection = createCollection
  brief.createMatrix = createMatrix
  brief.createVector = createVector
  brief.createOut = createOut
  brief.remove = remove
  brief.removeAt = removeAt
  brief.loop = loop
  brief.loopRight = loopRight
  brief.doubleLoop = doubleLoop
  brief.doubleLoopRight = doubleLoopRight
  brief.combine = combine
  brief.mix = mix
  brief.shuffle = shuffle
  brief.pick = pick
  brief.iterate = iterate
  brief.map = map
  brief.randFloat = randfloat
  brief.randInt = randint
  brief.randBool = randBool
  brief.randChar = randchar
  brief.randString = randstring
  brief.getAlphabet = getAlphabet
  brief.getEmpty = getEmpty
  brief.getFunctions = getFunctions
  brief.isBool = isBool
  brief.isObject = isObject
  brief.isInt = isInt
  brief.isFloat = isFloat
  brief.isString = isString
  brief.isArray = isArray
  brief.isNumber = isNumber
  brief.isFunction = isFunction
  brief.isClass = isClass
  brief.isDoubleArray = isDoubleArray
  brief.zip = zip
  brief.unzip = unzip
  brief.getRange = getRange
  brief.inRange = inRange
  brief.getKeys = getKeys
  brief.getValues = getValues
  brief.find = find
  brief.findAll = findAll
  brief.findAny = findAny
  brief.min = min
  brief.max = max
  brief.without = without
  brief.withoutBy = withoutBy
  brief.assign = assign
  brief.assignEmpty = assignEmpty
  brief.connect = connect
  brief.isOdd = isOdd
  brief.isEven = isEven
  brief.insert = insert
  brief.insertAt = insertAt
  brief.insertArrayAt = insertArrayAt
  brief.insertRight = insertRight
  brief.clone = clone
  brief.int = int
  brief.str = str
  brief.invert = invert
  brief.sort = sort
  brief.strip = strip
  brief.clamp = clamp
  brief.partition = partition
  brief.match = match
  brief.matchAny = matchAny
  brief.pluck = pluck
  brief.memorize = memorize
  brief.getMemorized = getMemorized
  brief.median = median
  brief.average = average
  brief.sum = sum
  brief.sumDiv = sumDiv
  brief.power = power
  brief.root = root
  brief.print = print
  brief.ceil = ceil
  brief.floor = floor
  brief.round = round
  brief.abs = abs
  brief.array = array
  brief.doubleArray = doubleArray
  brief.printDoubleArray = printDoubleArray
  brief.last = last
  brief.first = first
  brief.splice = splice
  brief.cut = cut
  brief.fromArray = fromArray
  brief.spliceWithout = spliceWithout
  brief.boundIndex = boundIndex
  brief.getDate = getDate
  brief.getDateAsArray = getDateAsArray
  brief.getTime = getTime
  brief.getTimeAsArray = getTimeAsArray
  brief.getDay = getDay
  brief.getMonth = getMonth
  brief.getYear = getYear
  brief.getHours = getHours
  brief.getMinutes = getMinutes
  brief.getSeconds = getSeconds
  brief.getMilli = getMilli
  brief.getEpoch = getEpoch

  // multiple names 
  brief.randBoolean = randBool
  brief.isBoolean = isBool

  return brief

})();
