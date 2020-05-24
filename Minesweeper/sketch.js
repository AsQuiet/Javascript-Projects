
let game;
let restartButton;
let remainingMines;


let easyButton;
let mediumButton;
let difficultButton;

let revealButton;


function setup() {
	createCanvas(600,600)	

	// setting up
	game = new Minesweeper(15,15,30)

	// button
	restartButton = createButton('restart')
	restartButton.mousePressed(restart)

	// remaining mines
	remainingMines = createP('remaining mines : ' + _.str(game.remaining))

	easyButton = createButton('easy')
	mediumButton = createButton('medium')
	difficultButton = createButton('hard')

	easyButton.mousePressed(easy)
	mediumButton.mousePressed(medium)
	difficultButton.mousePressed(difficult)

	revealButton = createButton('reveal')
	revealButton.mousePressed(revealAll)



}

function draw() {

	background(51)

	// drawing the grid
	game.show()

	// allowing the user to reveal cells 
	game.click()

	//
	game.unlock()

	remainingMines.html('remaining mines : ' + str(game.remaining))

}


function Cell(isMine=false, i,j) {

	this.isMine = isMine
	this.unlocked = false
	this.rev = false
	this.bombs = 0
	this.flagged = false
	this.i = i
	this.j = j


}


function Minesweeper(cols=10,rows=10,mines=10) {

	// the cols & rows
	this.cols = cols
	this.rows = rows

	// the size of each square, dependent on the cols
	this.size = width/this.cols

	// the grid, an array ofa arrays
	this.grid = _.doubleArray(this.cols, this.rows)

	// need for picking the mines
	this.loc = []

	this.unlocked = []

	this.gameOver = false


	// setting all the cells of the board
	_.doubleLoop(this.grid, (el , i, j) => {

		this.grid[i][j] = new Cell(false, i, j)

		this.loc.push(_.createVector(i,j)) 

	})

	// picking random mines
	this.mineAmount = mines
	_.iterate(this.mineAmount, (i) => {
		let mine = _.pick(this.loc)
		this.grid[mine.x][mine.y].isMine = true
		this.loc = _.remove(this.loc, mine)
	})

	this.remaining = this.mineAmount


	// calculating the bombs for each mine
	_.doubleLoop(this.grid, (el , i, j) => {

		// the amount of mines around this cell
		let mines = 0

		for (let x = -1; x < 2; x++) {
			for (let y = -1; y < 2; y++) {

				let ix = x + i
				let jy = y + j

				if (ix > -1 && ix < this.cols) {
					if (jy > -1 && jy < this.rows) {
						if (this.grid[ix][jy].isMine) {
							mines+=1
						}
					}
				}

			}
		}

		this.grid[i][j].bombs = mines
	})




	

	// drawing the cells
	this.show = function() {

		_.doubleLoop(this.grid, (el, i, j) => {

			let x = i * this.size, y = this.size * j
			let halfs = this.size / 2

			stroke(0)

			if (el.isMine) {
				fill(255)
				if (el.flagged) {fill(0,255,0,100)}
				ellipse(x + halfs, y + halfs, halfs )
			} else if (el.bombs > 0){
				// should display the amount of bombs
				textSize(halfs * 1.2)
				textAlign(CENTER)
				fill(255)
				text(el.bombs, x + halfs, y + halfs * 1.5)

			}

			if (!el.rev) {fill(255)} else {noFill()}

			rect(x, y, this.size, this.size)

		})


		if (this.gameOver) {
			textSize(100) 
			fill(0)
			text('GAME OVER', width/2, height/2)
			
		}

	}

	// alowing the user to reveal a cell
	this.click = function() {



		_.doubleLoop(this.grid, (el, i, j) => {

			let x = i * this.size, y = this.size * j

			let minx = mouseX < this.size + x && mouseX > x
			let miny = mouseY < this.size + y && mouseY > y

			if (minx && miny && mouseIsPressed) {
				this.grid[i][j].rev = true

				if (this.grid[i][j].bombs == 0) {
					this.unlocked.push(el)
				}

				if (this.grid[i][j].isMine) {
					this.gameOver = true
				}
			}

			// flag mine 
			if (minx && miny && keyIsPressed && this.grid[i][j].rev == false) {

				if (this.grid[i][j].isMine) {
					this.grid[i][j].flagged = true	
					this.grid[i][j].rev = true
					this.remaining--;
				} else {
					this.gameOver = true
				}
			}



		})



	}


	this.unlock = function() {


		let toAdd = []

		_.loop(this.unlocked, (el) => {


			let i = el.i, j = el.j

			for (let x = -1; x < 2; x++) {
				for (let y = -1; y < 2; y++) {

					let ix = x + i
					let jy = y + j

					if (ix > -1 && ix < this.cols) {
						if (jy > -1 && jy < this.rows) {
							
							this.grid[ix][jy].rev = true

							if (this.grid[ix][jy].bombs == 0 && this.grid[ix][jy].unlocked == false) {
								toAdd.push(this.grid[ix][jy])
								this.grid[ix][jy].unlocked = true
							}


						}
					}

				}
			}

		})


		this.unlocked = _.extend(this.unlocked, toAdd)



	}



}


function restart() {
	game = new Minesweeper(game.cols, game.rows, game.mineAmount)
}

function easy() {
	game = new Minesweeper(8,8,8)
}

function medium() {

	game = new Minesweeper(15,15,40)

}

function difficult() {
	game = new Minesweeper(24,24,99)
}


function revealAll() {
	_.doubleLoop(game.grid, (el, i, j) => {
		game.grid[i][j].rev = true
	})
}







