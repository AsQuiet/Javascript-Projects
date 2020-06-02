
// the points 
let points = [];

// the points most to the left
let leftMost;

// the point we are currentlty checking
let currentPoint;

// the points that w ahve checked 
let hull = []

// should we be checking for points?
let n = true;

// will make sure that there are no points next to the edges
let buffer = 50;

// should we display the lines and angles
let shouldDebug = true;
let count = 15;

function setup() {
	createCanvas(600, 400);

	// adding some points 
	_.iterate(15, () => { 
		points.push(createVector(random(buffer, width - buffer), random(buffer, height - buffer)));
	})
	
	// finding the leftmost point
	leftMost = _.min(points, (p) => p.x)
	currentPoint = leftMost;

	// adding that point to the hull
	hull.push(leftMost)

	
	frameRate(30)
	
}


function draw() {
	background(51);

	// drawing each points
	strokeWeight(10)
	stroke(255)
	for (let i = 0; i < points.length ; i++) {
		point(points[i].x, points[i].y)
	}

	// finding the next point 
	let recordPoint;
	for (let i = 0; i < points.length ; i++) {

		// if this point is the leftMost but the hull is already greater than one allow to check lefMost
		let c = points[i] == leftMost && hull.length > 1;

		// checking if this point is on the hull 
		if (hull.includes(points[i]) && !c) {
			continue;
		}

		// getting the vector to that point
		let other = p5.Vector.sub(points[i], currentPoint)

		// the angle to that vector
		let angle = degrees(other.heading())

		if (shouldDebug) {
			// drawing a line to the next point
			stroke(255, 100)
			strokeWeight(2)
			line(currentPoint.x, currentPoint.y, currentPoint.x+other.x, currentPoint.y + other.y)

			// displaying the angle of the next point
			noStroke()
			fill(255)
			text(_.round(angle, 2), currentPoint.x+other.x, currentPoint.y + other.y)
		}
		
		// does the next point have a greater counterclockwise rotation than the current point
		if (orientation(currentPoint, recordPoint, points[i]) == 2) {
			recordPoint = points[i]
		}

	}

	// should we set the next point as the current point?
	if (n) {
		currentPoint = recordPoint;
		hull.push(currentPoint);

		// if we are back at where we started stop checking everything
		if (currentPoint == leftMost) {
			n = false;
		}
	}

	// drawing the hull 
	beginShape()
	fill(0, 100)
	stroke(255)
	strokeWeight(1)
	for (let i = 0; i < hull.length ; i++) {
		vertex(hull[i].x, hull[i].y)
	}
	endShape(CLOSE)

	// drawing the left most point
	stroke(255, 0, 0)
	strokeWeight(10)
	point(leftMost.x, leftMost.y)

	if (keyIsPressed && count > 10) {
		shouldDebug = !shouldDebug;
		count = 0;
	}

	count++;
	noStroke()
	fill(255)
	text("press key to toggle lines", 2,height - 5)
}


function orientation(p, q, r) {

	if (q == undefined) return 2;

    let val = (q.y - p.y) * (r.x - q.x) -
			  (q.x - p.x) * (r.y - q.y);
			  
    if (val == 0) return 0; 	 // colinear
    return (val > 0)? 1: 2; 	// clock or counterclock wise
}