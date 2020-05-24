// traveling salesperson without genetic algorithm

let cities;
let cities2;

let ga;

let brute;

let amtCity=6


let start;
let end;
let startPrg;
let endPrg;

function setup() {
	createCanvas(1100, 400)

	// creating the cities
	cities = new Cities(amtCity)

	cities.limits = [0, width / 2, 0, height]

	// generating
	cities.generateCities()

	// creating the cities for the brute force 
	cities2 = new Cities(amtCity)

	

	_.loop(cities.cities, (city, i) => {
		let x = city.x + 500
		let y = city.y
		cities2.cities.push(createVector(x,y))
	})


	// brute forcing and checking all the options
	brute = new Brute(cities2)



	// creating the genetic algorithm
	ga = new Genetic(cities, 100)

}


function draw() {
	background(51)

	// drawing them
	cities.show()
	cities2.show()

	// running genetic alogirth
	
	ga.run()
	

	// running the brute force
	brute.bruteforce()


	// showing the progress 
	let pr = str(brute.progress) + '%'
	fill(255)
	noStroke()
	textSize(32)
	text(pr, 50 + 600, 370)


	// showing the progress 
	// let pr = str(brute.progress) + '%'
	fill(255)
	noStroke()
	textSize(32)
	text(ga.populationCount, 50, 370)


	let prgPerFrame = brute.progress / frameCount 

	let prgToGet = 100 - brute.progress

	let framesLeft = prgToGet * prgPerFrame

	let secLeft = framesLeft / 60 * 1000

	text('ca. ' + str(_.round(secLeft, 4)), 50 + 600, 397)




}




function Genetic(cities, popSize=4) {

	// the cities
	this.cities = cities

	// the current population
	this.population = []

	// the popoulatin count 
	this.populationCount = 0

	// the standard order
	this.stdOrder = _.getRange(cities.amt)

	// the population size 
	this.populationSize = popSize

	// the mutation rate
	this.mutationRate = 10

	// the best order in each population
	this.best = []

	// generating a new random population
	this.generatePopulation = function() {
		let newPop = []

		_.iterate(this.populationSize, (i) => {
			newPop.push(_.shuffle(this.stdOrder))
		})

		return newPop

	}

	// generating a new population from the last pop
	this.generatePopulationFrom = function(oldPopulation) {

		// calculating the fitness of each order
		let fitnessValues = []

		let p = []

		let newPop = []

		_.loop(oldPopulation, (el, i) => {

			let orderDst = 0

			for (let j = 0; j < el.length-1; j++) {

				let index = el[j]
				let nextIndex = el[j+1]

				let c1 = this.cities.cities[index]
				let c2 = this.cities.cities[nextIndex]

				orderDst += dist(c1.x, c1.y, c2.x, c2.y)
			}

			fitnessValues.push(orderDst)


			p.push({fitness:orderDst, order:el})

			this.drawOrder(el)

		})

		let best = _.min(p, (obj) => {return obj.fitness})
		this.best = best.order
		this.bestFit = best.fitness
		
		// mutating the best one
		_.iterate(this.populationSize, (i) => {

			let newOrder = _.clone(best.order)

			if (_.randInt(100) <= this.mutationRate) {
					// should mutate
					newOrder = _.shuffle(this.stdOrder)
				}

			newPop.push(newOrder)


		})



		return newPop



		

	}

	// run
	this.run = function() {

		this.population = this.generatePopulationFrom(this.population)
		this.populationCount++;

		// drawing the best
		this.drawOrder(this.best, true)
	}

	// creating the first pop
	this.population = this.generatePopulation()

	// drawing a certain order
	this.drawOrder = function(order, m) {

		stroke(255,100)
		noFill()
		strokeWeight(1)

		if (m) {
			strokeWeight(3)
			stroke(0, 255, 0)
		}

		for (let i = 0; i < order.length-1; i++) {
			let index = order[i]
			let nextIndex = order[i+1]
			line(this.cities.cities[index].x,this.cities.cities[index].y,this.cities.cities[nextIndex].x,this.cities.cities[nextIndex].y)
		}

	}



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

	this.done = false

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

		if (this.progress == 100) {
			this.done = true
		}

	}


	// drawing a certain order
	this.drawOrder = function(order, m) {

		stroke(255, 255, 0, 100)
		noFill()

		if (m) {
			strokeWeight(3)
			stroke(255, 0, 255)
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