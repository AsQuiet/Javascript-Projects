
let circles = []


function setup() {
	createCanvas(800, 800);

	// adding in the start circle => not required
	circles.push(new Circle(random(width), random(height), random(15, 50)))

	// adding new circles
	let amount = 200;
	for (let i = 0; i < amount + 1; i++) {

		// how many tries to find a new circle?
		let attempts = 30;

		// what circle should we add
		let found = false;
		let newCircle;

		// trying to find a circle
		while(attempts > 0) {
			
			// picking random spot 
			let nc = new Circle(random(width), random(height), 18);

			let isColliding = false;

			// is it colliding?
			for (let j = 0; j < circles.length; j++) {
				
				isColliding = circles[j].isOverlapping(nc);
				if (isColliding) {break;}

			} 

			// found a new spot
			if (!isColliding) {
				found = true;
				newCircle = nc;
				break;
			}

			attempts--;

		}

		// adding the circle
		if (found) {
			newCircle.index = i;
			circles.push(newCircle);
		}


	}

}

function draw() {
	background(51)

	// drawing the circles
	for (let i = 0; i < circles.length; i++) {
		circles[i].draw();
	}

	// hihglighting the max cirlce
	circles[circles.length - 1].draw(true);

	// highlighting the first circle
	circles[0].draw(true);

	noLoop();
}


// simply object for storing some data on each circle
function Circle(x, y, radius) {

	this.x = x
	this.y = y;
	this.radius = radius;
	this.index = 0;

	// are the two circles overlapping? => finding dist and chechking if dist is smaller than 2 radia
	this.isOverlapping = function(c) {

		distance = dist(this.x, this.y, c.x, c.y);

		if (distance < this.radius + c.radius) {
			return true;
		}

		return false;
		
	}

	// drawing the circle and it's index to see how many circles we have
	this.draw = function(high = false) {
		noStroke()
		fill(255);
		if (high) {fill(0,255,0)}
		ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
		fill(0);
		textAlign(CENTER);
		text(this.index, this.x, this.y);
	}

}