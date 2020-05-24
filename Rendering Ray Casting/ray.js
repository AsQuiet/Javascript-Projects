function Ray(pos, length=1000, angle=0) {

	// the pos
	this.pos = pos
	this.end = createVector()

	// how long is this ray 
	this.length = length

	// the objects it can hit (eg: walls, etc)
	this.obstacles = []
	// obstacle => line => ...,{start, end},...

	// this.angle
	this.angle = angle

	// is this ray intersecting?
	this.hit = false;

	// where is thig ray intersecting
	this.hitPos = createVector()


	// show this ray
	this.show = function(showPts=false) {
		noFill()
		stroke(255)
		

		if (this.hit) {
			line(this.pos.x, this.pos.y, this.hitPos.x, this.hitPos.y)
		}


	}



	// set the angle of this ray
	this.setAngle = function(angle) {

		this.end = p5.Vector.fromAngle(radians(angle),this.length)
		this.end.add(this.pos)

		this.angle = angle

	}

	// setting the angle
	this.setAngle(this.angle)

	// adding an obstacle
	this.obstruct = function(start, end) {
		this.obstacles.push({start:start, end:end})
	}

	// 
	this.intersect = function() {
		// the new settings
		let hitting = false
		let hittingPos = createVector()

		// the records
		let recordDst = Infinity
		let recordObs;

		// going through al obstacles and finding the one that's closest and is intersecting
		for (let i = 0; i < this.obstacles.length; i++) {

			let obs = this.obstacles[i]

			let isinter = this.isIntersecting(this.pos, this.end, obs.start, obs.end)

			if (isinter.intersection) {
				let dst = dist(this.pos.x, this.pos.y, isinter.pos.x, isinter.pos.y)

				if (dst < recordDst) {
					recordDst = dst
					recordObs = isinter.pos.copy()
				}

			}

		}

		if (recordDst != Infinity) {

			hitting = true
			hittingPos = recordObs

		}


		// setting the new settings
		this.hit = hitting
		this.hitPos = hittingPos

	}




	this.isIntersecting = function(p1, p2, p3, p4) {

		let x1 = p1.x, x2 = p2.x, x3 = p3.x, x4 = p4.x
		let y1 = p1.y, y2 = p2.y, y3 = p3.y, y4 = p4.y

		let d = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4)

		if (d==0) {
			return false
		}

		let t = (x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)
		let u = (x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)

		t = t / d
		u = u / d

		// let uInter = abs(u) <= 1 && abs(u) >= 0
		let uInter = u > -1 && u < 0
		let tInter = t <= 1 && t >= 0

		// textSize(24)
		// fill(255)
		// text(str(t), this.pos.x, this.pos.y-60)
		// text(str(u), this.pos.x, this.pos.y)


		let intersection = createVector()

		if (uInter) {
			intersection.x = x3 + u * (x4 - x3)
			intersection.y = y3 + u * (y4 - y3)
		}

		if (tInter) {
			intersection.x = x1 + t * (x2 - x1)
			intersection.y = y1 + t * (y2 - y1)
		}

		return {intersection:uInter && tInter, pos:intersection}

	}	





}