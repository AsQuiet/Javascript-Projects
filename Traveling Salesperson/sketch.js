// traveling salesperson without genetic algorithm

let cities;

let brute;


function setup() {
	createCanvas(600, 400)

	// creating the cities
	cities = new Cities(9)

	// generating
	cities.generateCities()

	// brute forcing and checking all the options
	brute = new Brute(cities)

	console.log(brute.amtOfOrders)

}


function draw() {
	background(51)

	// drawing them
	cities.show()

	// running the brute force
	brute.bruteforce()


	// showing the progress 
	let pr = str(brute.progress) + '%'
	fill(255)
	noStroke()
	textSize(32)
	text(pr, 50, 370)
}


function Brute(cities) {

	// the orders it has checked
	this.checked = []

	// the order it's checkign 
	this.order = []

	// the standard order
	this.stdOrder = _.getRange(cities.amt)

	// the record order 
	this.recordOrder = []

	// the record distance
	this.recordDistance = Infinity

	// calculating the amount of possible orders 
	this.amtOfOrders = 0

	// the cities objects
	this.cities = cities

	// how many orders have we checked
	this.progress = 0

	this.calcOrders = function() {

		this.amtOfOrders = factorial(this.cities.amt)
	}

	this.calcOrders()



	// the main function
	this.bruteforce = function() {

		if (this.checked.length >= this.amtOfOrders) {
			this.drawOrder(this.recordOrder, true)
			return;
		}

		let newOrder = _.shuffle(this.stdOrder)

		while(true) {

			if (this.checked.includes(newOrder)) {
				newOrder = _.shuffle(this.stdOrder)
			} else {
				break;
			}

		}


		this.checked.push(newOrder)

		// drawing the newOrder
		this.drawOrder(newOrder)

		// calculatin the distance
		let dst = 0
		for (let i = 0; i < newOrder.length-1; i++) {
			let index = newOrder[i]
			let nextIndex = newOrder[i+1]
			
			let c1 = this.cities.cities[index]
			let c2 = this.cities.cities[nextIndex]

			dst += dist(c1.x, c1.y, c2.x, c2.y)

		}

		if (dst < this.recordDistance) {
			this.recordDistance = dst
			this.recordOrder = newOrder
		}

		this.drawOrder(this.recordOrder, true)

		this.progress = _.round(this.checked.length / this.amtOfOrders * 100, 2)

	}


	// drawing a certain order
	this.drawOrder = function(order, m) {

		stroke(255)
		noFill()

		if (m) {
			strokeWeight(2)
			stroke(255, 0, 0)
		}

		for (let i = 0; i < order.length-1; i++) {
			let index = order[i]
			let nextIndex = order[i+1]
			line(this.cities.cities[index].x,this.cities.cities[index].y,this.cities.cities[nextIndex].x,this.cities.cities[nextIndex].y)
		}

	}

}





function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}











// end