
// our mover objects
let m;

// should the path be shown?
let showPath = false;

function setup() {
	createCanvas(600, 400)

	// a low speed will result in a very smooth moving object
	m = new Mover(0.002)

	// generate a 1000 x and y map positions
	m.generateCharts(0, width, 0, height, 1000);

	// when the mover is done we want to generate the charts again 
	m.onDone = function() {m.generateCharts(0, width, 0, height, 1000);}

}


function draw() {
	background(51)
	let msg = "Press any key to enable path."

	// drawing the path
	if (showPath) {m.drawPath(); msg = "Press the mouse to disable path."}

	// showing our mover object by drawing a small circle at it's position
	m.draw()

	// updating it's x and y position
	m.update()

	// listening to events
	if (keyIsPressed) {showPath = true}
	if (mouseIsPressed) {showPath = false}

	// displaying info
	textSize(24)
	text(msg, 0, height - 10)
	

}


function Mover(speed) {

	// the current position
	this.x = 0;
	this.y = 0;

	// the positions the mover should have in the future
	this.xChart = []
	this.yChart = []

	// at what position are we?
	this.chartIndex = 0;

	// the difference of the perlin noise generation => smaller values => smaller changes
	this.speed = speed;

	// will be called when the mover is done
	this.onDone = function() {console.log("Mover is done moving.")}

	// generates the position charts
	this.generateCharts = function(xMin, xMax, yMin, yMax, n) {

		// reseting all the data
		this.xChart = []
		this.yChart = []
		this.chartIndex = 0;
	
		// generating the x positions
		let xOff = 0.01;
		for (let i = 0; i < n ; i++) {
			xOff += this.speed;
			this.xChart.push(floor(noise(xOff) * (xMax - xMin) + xMin))
		}

		// generating the y positions
		noiseSeed(floor(random(95)))
		let yOff = 0.01;
		for (let i = 0; i < n ; i++) {
			yOff += this.speed;
			this.yChart.push(floor(noise(yOff) * (yMax - yMin) + yMin))
		}

		print(this.xChart)
		print(this.yChart)

	}	

	// set the next position
	this.update = function() {
		
		if (this.chartIndex < this.xChart.length) {

			this.x = this.xChart[this.chartIndex]
			this.y = this.yChart[this.chartIndex]

		} else {

			this.onDone()

		}

		// going to the new index
		this.chartIndex++;
		
	}

	// showing the mover
	this.draw = function() {

		noStroke()
		fill(255)
		ellipse(this.x, this.y, 14, 14)

	}

	// draws the path of this mover
	this.drawPath = function() {

		stroke(0,255,0)
		noFill()

		for (let i = 0; i < this.xChart.length - 1; i++) {

			line(this.xChart[i], this.yChart[i],this.xChart[i+1], this.yChart[i+1])

		}

	}
}