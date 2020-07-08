let points = [];

let leftMostPoint;
let currentPoint;
let checkedPoints = []
let shouldCheck = true;

// will make sure that there are no points near to the edges
let bufferSpace = 50;

// should we display the lines and angles
let shouldDebug = false;

// put some time between key register for toggling the line at bottom of canvas
let count = 15;

function setup() {
	createCanvas(600, 400);

	// adding random points
	_.iterate(15, () => { points.push(createVector(random(bufferSpace, width - bufferSpace), random(bufferSpace, height - bufferSpace))); })
	
	// finding the leftmost point
	leftMostPoint = _.min(points, (p) => p.x)
	currentPoint = leftMostPoint;
	checkedPoints.push(leftMostPoint)
}

function draw() {
	background(51);

	drawPoints()
	drawCheckedPoints()

	// finding the next point 
	let recordPoint;
	for (let i = 0; i < points.length ; i++) {

		// I dont know what this line does anymore. :)
		let check = points[i] == leftMostPoint && checkedPoints.length > 1;

		// checking if this point is on the hull 
		if (checkedPoints.includes(points[i]) && !check) continue
		
		if (shouldDebug) drawDebug(points[i])

		// does the next point have a greater counterclockwise rotation than the current point
		if (orientation(currentPoint, recordPoint, points[i])) recordPoint = points[i]
	}

	// should we set the next point as the current point?
	if (shouldCheck) {
		currentPoint = recordPoint;
		checkedPoints.push(currentPoint);

		// if we are back at where we started stop checking everything
		shouldCheck = currentPoint != leftMostPoint
	}

	if (keyIsPressed && count > 10) {
		shouldDebug = !shouldDebug;
		count = 0;
	}

	count++;
	noStroke()
	fill(255)
	text("press a key to toggle lines", 2,height - 5)
}


function orientation(p, q, r) {
	if (q == undefined) return true;
	let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
	
    return (val >= 0) ? false: true;
}

function drawPoints() {
	strokeWeight(10)
	stroke(255)
	for (let i in points) point(points[i].x, points[i].y)
}

function drawCheckedPoints() {
	fill(0, 100)
	stroke(255)
	strokeWeight(1)
	beginShape()
	for (let i in checkedPoints) {vertex(checkedPoints[i].x, checkedPoints[i].y)}
	endShape(CLOSE)
}

function drawDebug(p) {

	let vecToPoint = p5.Vector.sub(p, currentPoint)
	let angleOfPoint = degrees(vecToPoint.heading())

	stroke(255, 100)
	strokeWeight(2)
	line(currentPoint.x, currentPoint.y, currentPoint.x+vecToPoint.x, currentPoint.y + vecToPoint.y)

	noStroke()
	fill(255)
	text(_.round(angleOfPoint, 2), currentPoint.x+vecToPoint.x, currentPoint.y + vecToPoint.y)
}