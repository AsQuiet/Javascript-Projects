let mover;

function setup() {
	createCanvas(600, 400)

	mover = new Mover(0.002)
	mover.moveWithinBounds(0, width, 0, height, 1000);
	mover.onDone = function() {mover.moveWithinBounds(0, width, 0, height, 1000);}

}

function draw() {
	background(51)

	mover.draw()
	mover.update()

	textSize(24)
	noStroke()
	fill(255)
	if (mover.showPath) { text("Press the mouse to disable path.", 0, height - 10) } 
	else { text("Press any key to enable path.", 0, height - 10) }
}

function Mover(speed=0.002) {
	this.x = 0;
	this.y = 0;

	// the positions the mover should have in the future
	this.xChart = []
	this.yChart = []
	this.chartIndex = 0;

	// the difference in the perlin noise generation => smaller values => smaller changes
	this.speed = speed;
	this.showPath = false; 
	this.onDone = function() {console.log("Mover is done moving.")}

	// generates the position charts
	this.moveWithinBounds = function(xMin, xMax, yMin, yMax, n) {

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

	this.update = function() {
		
		if (keyIsPressed) this.showPath = true
		if (mouseIsPressed) this.showPath = false
		
		this.chartIndex++;

		if (this.chartIndex < this.xChart.length) {

			this.x = this.xChart[this.chartIndex]
			this.y = this.yChart[this.chartIndex]

		} else this.onDone() 

	}

	this.draw = function() {
		noStroke()
		fill(255)
		ellipse(this.x, this.y, 14, 14)
		if (this.showPath) this.drawPath()
	}

	this.drawPath = function() {
		stroke(0,255,0)
		noFill()
		for (let i = 0; i < this.xChart.length - 1; i++) line(this.xChart[i], this.yChart[i],this.xChart[i+1], this.yChart[i+1])
	}
}