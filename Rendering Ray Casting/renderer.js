function Renderer(camera, screenPos, resolution) {

	// the camera object
	this.camera = camera 

	// the place to draw the screen
	this.screenPos = screenPos

	// the width of the screen
	this.screenW = resolution.w

	// the height of the screen
	this.screenH = resolution.h

	// the resulotion of each ray
	this.rayW = function() { return this.screenW / this.camera.rays.length }

	// the height of a ray
	this.rayH = this.screenH

	// drawing the screen
	this.showScreen = function() {

		fill(0)
		noStroke()
		rect(this.screenPos.x, this.screenPos.y, this.screenW, this.screenH)
	}

	// rendering the rays
	this.render = function() {

		for (let i = 0; i < this.camera.rays.length; i++) {

			// this ray
			let ray = this.camera.rays[i]

			// the width of the ray
			let w = this.rayW()

			// the center position of the ray 
			let x = this.screenPos.x + i * w
			let y = this.screenPos.y 

			// the standard height of the ray
			let rayHeight = this.screenH
		

			fill(0)
			if (ray.hit) {

				// calculating distance to intersection
				let dst = dist(ray.pos.x, ray.pos.y, ray.hitPos.x, ray.hitPos.y)
					
				// the color of this ray	
				let color = map(dst, 0, ray.length, 255, 0)

				// filling with color
				fill(color)

				// caculating the height of each wall
				rayHeight = map(dst, 0, ray.length, this.screenH, 0)

			}

			rectMode(CENTER)
			// drawing
			rect(x + w / 2 , y + this.rayH / 2, w, rayHeight)


		}	

	}


}


























//ens