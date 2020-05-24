function Camera(startingAngle=0, endingAngle=45) {

	// the rays of this camera
	this.rays = []

	// the position of the camera
	this.pos = createVector(width/2, height/2)

	// the length of the rays
	this.rayLength = 1000

	// the obstacles
	this.obstacles = []

	//the fov 
	this.fov = endingAngle - startingAngle

	// the view angle
	this.viewAngle = (this.fov) / 2

	// creating the rays
	for (let i = startingAngle; i < endingAngle; i++) {
		let newRay = new Ray(this.pos, this.rayLength, i)
		this.rays.push(newRay)
	}


	// showing all the rays
	this.showRays = function() {
		for (let i = 0; i < this.rays.length; i++) {

			this.rays[i].show()

		}
	}

	// showing the camera
	this.showCamera = function() {
		fill(15, 150)
		ellipse(this.pos.x, this.pos.y, 10, 10)

		// let angleVector = p5.Vector.fromAngle(radians(this.viewAngle))
	
		// angleVector.setMag(50)

		// angleVector.add(this.pos)

	}

	// showgin all the obstacles
	this.showObstacles = function() {
		noFill()
		stroke(255)
		_.loop(this.obstacles, (el) => {

			line(el.start.x, el.start.y, el.end.x, el.end.y)

		})
	}

	// running all the code
	this.run = function() {
		for (let i = 0; i < this.rays.length; i++) {

			this.rays[i].intersect()


		}
	}


	// adding an obstacle to the rays
	this.obstructRays = function(start ,end) {
		this.obstacles.push({start:start, end:end})
		for (let i = 0; i < this.rays.length; i++) {
			this.rays[i].obstruct(start, end)
		}
	}	

	// moving the camera
	this.follow = function(v) {

		this.pos = v.copy()

		for (let i = 0; i < this.rays.length; i++) {

			this.rays[i].pos = this.pos.copy()
			this.rays[i].setAngle(this.rays[i].angle)

		}


	}


	// rotating the camera by adding an offset to ech vector's angle 
	this.rotate = function(angleOffset) {

		for (let i = 0; i < this.rays.length; i++) {

			this.rays[i].setAngle(this.rays[i].angle + angleOffset)

		}

		this.viewAngle += angleOffset

	}


	// limitign the position of the camera
	this.limitPosition = function(xBoundMin, xBoundMax, yBoundMin, yBoundMax) {

		if (this.pos.x < xBoundMin) {
			this.pos.x = xBoundMin
		}
		if (this.pos.x > xBoundMax) {
			this.pos.x = xBoundMax
		}

		if (this.pos.y < yBoundMin) {
			this.pos.y = yBoundMin
		}
		if (this.pos.y > yBoundMax) {
			this.pos.y = yBoundMax
		}



	}



}










// end