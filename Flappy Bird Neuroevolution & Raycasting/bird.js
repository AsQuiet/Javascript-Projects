function Bird(g=0.6, mass=1) {

	// the position
	this.pos = createVector()

	// the upward velocity
	this.vel = createVector()

	// the upward acc
	this.acc = createVector()

	// the gravity	
	this.g = g

	// the mass of the bird
	this.mass = mass

	// the jump force
	this.jumpForce = 5

	// the height
	this.h = 20

	// the width
	this.w = this.h

	// the fitness
	this.fitness = 0

	// the neural network of the bird
	this.brain = new NeuralNetwork(3,4,1)

	// this.brain.train([100, 150, 0], [0.2])
	this.dead = false


	// updating it's pos etc
	this.update = function() {
		this.pos.add(this.vel)
		this.vel.add(this.acc)
		this.acc.mult(0)

		this.vel.limit(this.jumpForce * 1.5)

		if (this.dead == false) {
			this.fitness++;
		}

	}

	// adding a force
	this.applyForce = function(f) {
		let force = p5.Vector.div(f, this.mass)
		this.acc.add(force)
	}

	// jumping up 
	this.jump = function() {

		this.applyForce(createVector(0, -this.jumpForce))

	}

	// applying gravity
	this.gravity = function() {

		this.applyForce(createVector(0, this.g))

	}

	// making sure bird doesn't go off screen
	this.limit = function(yMin, yMax) {

		if (this.pos.y > yMax) {
			this.pos.y = yMax
		}
		if (this.pos.y < yMin) {
			this.pos.y = yMin
		}

	}

	// using neural network to steer
	this.auto = function(pipePair) {

		let xDist = pipePair[0].pos.x - this.pos.x
		let yTopOfGap = pipePair[0].h - this.pos.y
		let yBotOfGap = pipePair[1].pos.y - this.pos.y

		let out = this.brain.feedforward([xDist/4, yTopOfGap/4, yBotOfGap/4])[0]

		if (out < 0.6) {
			this.jump()
		}
	}

	// drawing thee bird
	this.show = function() {
		// noStroke()
		if (!this.dead) {
			fill(255, 150)
			stroke(255)
			strokeWeight(2)
			ellipse(this.pos.x, this.pos.y, this.w, this.h)
		}
	}

}




























// end