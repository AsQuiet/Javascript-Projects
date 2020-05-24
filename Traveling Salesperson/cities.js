function Cities(amt=4) {

	// the amount of cities
	this.amt = amt

	// the cities (vectors)
	this.cities = []

	// the limits of the cities (xMin, xMax, yMin, yMax)
	this.limits = [0, width, 0, height]

	// a function that will generate the amt of cities within the bounds
	this.generateCities = function() {

		// resseting the cities
		this.cities = []

		_.iterate(this.amt, (i) => {

			let x = _.randInt(this.limits[0], this.limits[1])
			let y = _.randInt(this.limits[2], this.limits[3])

			this.cities.push(createVector(x, y))


		})

	}

	// drawing the cities
	this.show = function() {
		noStroke()
		fill(255)

		_.loop(this.cities, (city) => {
			ellipse(city.x, city.y, 12, 12)
		})
	}

}