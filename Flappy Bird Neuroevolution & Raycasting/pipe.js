function Pipe() {

	// is this pipe the top part?
	this.top = true

	// the vel
	this.vel = createVector()

	// the position
	this.pos = createVector()

	// the width & height of the pipe
	this.w = 15

	// the height
	this.h = 150

	// drawing the pipe
	this.show = function() {
		noStroke()
		fill(200)
		rect(this.pos.x, this.pos.y, this.w, this.h)
	}

	// updating the position
	this.update = function() {
		this.pos.add(this.vel)
	}

}

function PipeManager() {

	// the pipes , in pairs
	this.pipes = []

	// the gap height of each pair
	this.gap = 150

	// the width of the pipes
	this.w = 40

	// the minimun height of the pipes
	this.minH = 150

	// the speed of the pipes
	this.speed = 2

	// the count
	this.count = 0
	this.countLimit = 0

	// the nearest pipe pair
	this.nearestPipePair = []

	// creating a new pair
	this.createPipe = function() {

		// new pipes
		let top = new Pipe()
		let bot = new Pipe()
		bot.top = false


		// the y pos of the gap
		let gapY = _.randInt(this.minH, height - this.minH - this.gap)

		// the height of the first pipe
		let topH = gapY

		// the pos of bottom
		let botY = gapY + this.gap

		// the height
		let botH = height - botY

		top.pos = createVector(width,0)
		top.h = topH
		top.w = this.w

		bot.pos = createVector(width, botY)
		bot.h = botH
		bot.w = this.w


		// giving them a vel
		bot.vel = createVector(-this.speed, 0)
		top.vel = createVector(-this.speed, 0)

		let pair = [top, bot]

		this.pipes.push(pair)




	}

	// showing the pipes 
	this.show = function() {
		_.loop(this.pipes, (pair) => {
			pair[0].show()
			pair[1].show()
			pair[0].update()
			pair[1].update()

		})
	}


	// removing a pair when the x pos is lower than 0
	this.removePairIf = function() {

		let first = this.pipes[0]

		if (first[0].pos.x + this.w <= 0) {
			// remove pair
			this.pipes.shift()
		}



	}

	// adding every time timer runs out
	this.addPipeEvery = function(count=100) {

		this.countLimit = count 
		this.count++;

		if (this.count > this.countLimit) {
			this.count = 0;
			this.createPipe()
		}

	}


	// do collision detecting for the first pipe
	this.collideWith = function(bird) {

		let topPipe = _.first(this.pipes)[0]
		let botPipe = _.first(this.pipes)[1]

		// getting the closest pipe-pair
		for (let i = 0; i < this.pipes.length; i++) {

			let pair = this.pipes[i]

			if (pair[0].pos.x + this.w + 15 > bird.pos.x) {

				topPipe = pair[0]
				botPipe = pair[1]
				break;
				
			}
		}
		this.nearestPipePair = [topPipe, botPipe]

		// fill(0,255,0)
		// rect(topPipe.pos.x, topPipe.pos.y, topPipe.w, topPipe.h)

		let gapPos = topPipe.h

		// check is 
		let birdInGap = bird.pos.y > gapPos && bird.pos.y + bird.h < gapPos + this.gap

		let birdBetweenGap = bird.pos.x > topPipe.pos.x && bird.pos.x + bird.w < topPipe.pos.x + topPipe.w + 15
		
		let topHit= false
		if (bird.pos.y - bird.h / 2 < topPipe.pos.y) {
			topHit = true

		}


		return (!(birdInGap) && birdBetweenGap ) || (birdBetweenGap && topHit)

	}


}
















































// end
