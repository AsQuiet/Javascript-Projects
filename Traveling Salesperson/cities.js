function Cities(amt=4) {

	this.amtOfCities = amtOfCities
	this.cities = []

	this.limits = [0, width, 0, height]

	// a function that will generate the amt of cities within the bounds
	this.generateCities = function() {

		// resseting the cities
		this.cities = []

		_.iterate(this.amtOfCities, (i) => {

			let x = _.randInt(this.limits[0], this.limits[1])
			let y = _.randInt(this.limits[2], this.limits[3])

			this.cities.push(createVector(x, y))
		})

	}

	// drawing the cities
	this.show = function() {
		noStroke()
		fill(255)
		for (let i in this.cities) { ellipse(cities[i].x, cities[i].y, 12, 12) }
	}

}