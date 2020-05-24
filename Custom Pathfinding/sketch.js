
let maze;

function setup() {
	createCanvas(600, 600)

	let mazeSize = 40

	// let target = createVector(mazeSize-1, mazeSize-1)
	let target = createVector(_.randInt(mazeSize-1), _.randInt(mazeSize-1))

	// the new maze
	maze = new Maze(mazeSize, mazeSize, target)

	// generating
	maze.generateMaze()


}

function draw() {
	background(51)

	// drawing the maze
	maze.drawNodes()
	fill(0,0,255)
	// solving the maze 
	maze.solve()

	noLoop()


}



function Maze(cols, rows, goal) {

	// the cols & rows 
	this.cols = cols
	this.rows = rows

	// calculating the size
	this.size = width / this.cols

	// the grid of nodes
	this.grid = _.doubleArray(cols, rows)

	// the goal or target (indexI, indexJ)
	this.target = goal

	// the position of the target (posI, posJ)
	this.targetPos = createVector(goal.x * this.size, goal.y * this.size)

	// the amt of walls 
	this.wallRate = 20

	// the node we're currently checking 
	this.current = createVector(0,0)

	// sets the grid
	this.generateMaze = function() {

		_.doubleLoop(this.grid, (el, i, j) => {

			// the position of this node
			let x = this.size * i
			let y = this.size * j

			// creating the new node object
			let newNode = new this.Node()

			// setting it's basic data
			newNode.pos = createVector(x, y)
			newNode.i = i
			newNode.j = j
			newNode.isTarget = false

			// is this node the target
			if (i == this.target.x && j == this.target.y) {
				newNode.isTarget = true
			}

			// should this node be a wall
			newNode.isWall = _.randInt(100) < this.wallRate && newNode.isTarget == false

			// calculating the dist
			let dst = dist(x, y, this.targetPos.x, this.targetPos.y)

			// setting the distance
			newNode.distToGoal = dst

			// setting the grid node 
			this.grid[i][j] = newNode
		})

	}


	// drawing all the tiles
	this.drawNodes = function() {

		fill(255)
		stroke(0)

		_.doubleLoop(this.grid, (node, i, j) => {

			if (node.isTarget) {
				fill(255,0,0)
			} else if (node.isWall) {
				fill(51)
			} else if (i == this.current.x && j == this.current.y) {
				fill(0, 255, 0)
			} else {
				fill(255)
			}

			rect(node.pos.x, node.pos.y, this.size, this.size)
		})


	}

	// the node object
	this.Node = function() {
		this.pos = createVector()
		this.i = 0
		this.j = 0
		this.distToGoal = 0
		this.checked = false
		this.checked2 = false
		this.isWall = false
		this.isTarget = false
	}


	// getting the nieghbours of a node
	this.getAround = function(i, j) {
		let ng = []
		if (i >= 0 && i < this.cols - 1) {
			ng.push(this.grid[i+1][j])
		} 
		if (i <= this.cols - 1 && i > 0) {
			ng.push(this.grid[i-1][j])
		}

		if (j >= 0 && j < this.rows - 1) {
			ng.push(this.grid[i][j+1])
		} 
		if (j <= this.rows - 1 && j > 0) {
			ng.push(this.grid[i][j-1])
		}

		return ng

	}




	// the algorithm
	this.solve = function() {


		let isSolved = false

		let stack = []
		let stacked = false

		while (!isSolved) {

			// getting the neighbours of the current node
			let neighbours = this.getAround(this.current.x, this.current.y)

			// getting the current node 
			let currentNode = this.grid[this.current.x][this.current.y]
			ellipse(currentNode.pos.x + this.size/2, currentNode.pos.y + this.size/2, this.size/3, this.size/3)

			// setting the current node to checked or doublechecked
			if (currentNode.checked) {
				currentNode.checked2 = true
			} else {
				currentNode.checked = true;
			}

			if (!stacked) {
				stack.push(this.current.copy())
				stacked = false
			} else {

			}

			if (currentNode.isTarget) {
				console.log('found')
				break;
			}

			// making sure we can go to any of the other nodes
			let legal = _.partition(neighbours, (n) => {return !(n.checked || n.isWall || n.dontGoTo)})

			if (legal[0].length == 0) {
				legal = _.partition(neighbours, (n) => {return !(n.checked2 || n.isWall || n.dontGoTo)})

				if (legal[0].length == 0) {
					console.log('oops')
					console.log(currentNode)
					console.log(legal)
					console.log(stack)
					stacked = true

					currentNode.dontGoTo = true
					this.current = stack[stack.length-1].copy()
					stack.pop()

				} else {
					let nodeToGoTo = _.min(legal[0], (n) => {return n.distToGoal})
					// nodeToGoTo.checked2 = true
					this.current = createVector(nodeToGoTo.i, nodeToGoTo.j)
				}


			} else {
				let nodeToGoTo = _.min(legal[0], (n) => {return n.distToGoal})
				// nodeToGoTo.checked = true
				this.current = createVector(nodeToGoTo.i, nodeToGoTo.j)
			}

			

		}

	}


}














































// end