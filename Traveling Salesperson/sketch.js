// traveling salesperson without genetic algorithm

let cities;
let brute;

function setup() {
	createCanvas(600, 400)

	cities = new Cities(9)
	cities.generateCities()

	brute = new Brute(cities)
	console.log(brute.amtOfPossibleOrders)

}


function draw() {
	background(51)

	cities.show()
	brute.bruteforce()

	// showing the progress 
	let pr = str(brute.progress) + '%'
	fill(255)
	noStroke()
	textSize(32)
	text(pr, 50, 370)
}


function Brute(cities) {

	this.checkedOrders = [] 
	this.currentOrder = []

	this.stdOrder = _.getRange(cities.amt)	// used to create random orders

	this.recordOrder = []
	this.recordDistance = Infinity

	this.amtOfPossibleOrders = 0

	this.cities = cities
	this.progress = 0

	this.calcOrders = function() { this.amtOfPossibleOrders = factorial(this.cities.amt) }
	this.calcOrders()

	this.bruteforce = function() {

		if (this.checked.length >= this.amtOfOrders) {
			this.drawOrder(this.recordOrder, true)
			return;
		}

		let newOrder = this.getNewOrder()
		this.checked.push(newOrder)
		this.drawOrder(newOrder)

		// calculating the distance
		let dst = this.calcDistOfOrder(newOrder)

		if (dst < this.recordDistance) {
			this.recordDistance = dst
			this.recordOrder = newOrder
		}

		this.drawOrder(this.recordOrder, true)

		this.progress = _.round(this.checked.length / this.amtOfOrders * 100, 2)

	}

	// fincding a new order that hasn't been checked
	this.getNewOrder = function() {
		let newOrder = _.shuffle(this.stdOrder)

		while(true) {

			if (this.checked.includes(newOrder)) {
				newOrder = _.shuffle(this.stdOrder)
			} else {
				break;
			}

		}
		return newOrder
	}

	// returns the distance of an order
	this.calcDistOfOrder = function(order) {
		let dst = 0
		for (let i = 0; i < order.length-1; i++) {
			
			let c1 = this.cities.cities[order[i]]
			let c2 = this.cities.cities[order[i+1]]

			dst += dist(c1.x, c1.y, c2.x, c2.y)

		}
		return dst
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
