
let s;

let inv1;
let inv2;
let inv3;
let inr1;
let inr2;
let inr3;

let button;


function setup() {
	createCanvas(600, 600)
	s = new Spirograph(width / 2, height / 2)


	inv1 = createInput("velocity 1")
	inv2 = createInput("velocity 2")
	inv3 = createInput("velocity 3")
	inr1 = createInput("radius 1")
	inr2 = createInput("radius 2")
	inr3 = createInput("radius 3")
	button = createButton("apply")
	button.mousePressed(loadFromInput) 

}

function loadFromInput() {

	s = new Spirograph(width / 2, height / 2)
	s.v1 = float(inv1.value());
	s.v2 = float(inv2.value());
	s.v3 = float(inv3.value());
	s.r1 = float(inr1.value());
	s.r2 = float(inr2.value());
	s.r3 = float(inr3.value());
	

}

function draw() {
	background(51)
	s.draw()
	s.updateAngles()
	s.drawLogged()
}


function Spirograph(x, y) {

	// all the radia
	this.r1 = 150;
	this.r2 = 40;
	this.r3 = 20;
	this.r4 = 6;

	// the angles for each 
	this.a1 = 0;
	this.a2 = 0;
	this.a3 = 0;

	// the speed at wich each angle will change
	this.v1 = 0.03;
	this.v2 = 0.12;
	this.v3 = -0.48;

	// the center of the spirograph
	this.x = x;
	this.y = y;

	// the positions 
	this.xPos = []
	this.yPos = []
	this.max = 2000;

	// drawing the sprirograh 
	this.draw = function() {

		stroke(255, 150)
		strokeWeight(1)
		noFill()
		ellipse(this.x, this.y, this.r1 * 2, this.r1 * 2)

		// calculating all the other positions 
		// the radius of the "big" circle
		let x1 = (this.r1 + this.r2) * cos(this.a1) + this.x
		let y1 = (this.r1 + this.r2) * sin(this.a1) + this.y;

		// drawing a line
		line(this.x, this.y, x1, y1);

		// drawing the second circle
		ellipse(x1, y1, this.r2 * 2, this.r2 * 2)

		// calculating the radius of the second circle
		let x2 = (this.r2 + this.r3) * cos(this.a2) + x1;
		let y2 = (this.r2 + this.r3) * sin(this.a2) + y1;

		line(x1, y1, x2, y2);
		ellipse(x2, y2, this.r3 * 2, this.r3 * 2);

		// calculating the radius of the second circle
		let x3 = (this.r3 + this.r4) * cos(this.a3) + x2;
		let y3 = (this.r3 + this.r4) * sin(this.a3) + y2;

		line(x2, y2, x3, y3);
		ellipse(x3, y3, this.r4 * 2, this.r4 * 2);

		this.logPosition(x3, y3);
		
	}

	this.updateAngles = function() {

		this.a1 += this.v1; 
		this.a2 += this.v2; 
		this.a3 += this.v3;
		
	}


	this.logPosition = function(x, y) {

		this.xPos.push(x)
		this.yPos.push(y)

		if (this.xPos.length > this.max) {
			this.xPos.shift();
			this.yPos.shift();
		}

	}

	this.drawLogged = function() {

		stroke(255,0,0,100)
		for (let i = 0; i < this.xPos.length - 1; i++) {

			line(this.xPos[i], this.yPos[i],this.xPos[i+1], this.yPos[i+1])

		}

	}

}