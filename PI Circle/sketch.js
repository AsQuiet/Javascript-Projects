
let totalDots = 0;
let circleDots = 0;

let dots = [];

let circleRadius;

let piappr = 0;

function setup() {
	createCanvas(600, 600);

	circleRadius = width / 2;

	_.iterate(10000, () => {

		let x = random(0, width);
		let y = random(0, height);

		// is this dot inside the circle?
		let distance = dist(width / 2, height / 2, x, y);
		let inCircle = false;

		if (distance < circleRadius) {
			inCircle = true;
			circleDots++;
		}

		// increasing the count 
		totalDots++;

		// calculating the ratio
		piappr = 4 * (circleDots / totalDots);

		dots.push({x:x, y:y, inCircle:inCircle});

	}) 

	console.log(piappr)

}


function draw() {
	background(51);

	// drawing the circle
	fill(50, 50)
	stroke(255)
	circle(width / 2, height / 2, circleRadius * 2)

	// drawing all the dots
	_.loop(dots, (el) => {
		stroke(255)
		if (el.inCircle) {
			stroke(255,0,0);
		} 
		point(el.x, el.y)

	})

	// showing the pi approximation
	noStroke();
	fill(255);
	textSize(64)
	textAlign(CENTER)
	text(piappr, width / 2, height / 2);

	// showing the total dots
	fill(255, 200)
	textSize(16)
	text("with " + str(totalDots) + " dots", width / 2, height / 2 + 16)

	// no reason to keep looping 
	noLoop()
}