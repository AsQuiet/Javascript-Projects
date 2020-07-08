let spheres = [];

// speed of line that is colliding with spheres
let sightStepSize = 25;

let viewerPos = _.createVector(50, 70);
let viewerSight;

let viewerLength = 1500;
let viewerAngle = 0;
let viewerSpeed = 0.001;

let collisionPoints = [];

function setup() {
	createCanvas(1200, 600)

	// generating random spheres
	_.iterate(8, () => { spheres.push({ pos:_.createVector(_.randInt(width), _.randInt(height)), radius:_.randInt(90) }) })

	// where is the line looking at (end pos of line)
	viewerSight = _.createVector(width, height);
}

function draw() {
	background(51)

	drawSpheres(spheres)
	drawViewer(viewerPos, viewerSight)
	drawCollisionPoints(collisionPoints)
	
	if (collisionPoints.length > 300) collisionPoints.shift()
	
	march(viewerPos, viewerSight, spheres, 15)
	incrementViewer()

}

// finds the closest object, checks if the distance if big enough and moves forward on line, if distance is to small (under 4) then it will add that collision point to the global collisionPoints
function march(pos, end, objs, n) {

	let closestSphereToPos = _.min(objs, (obj) => {return dist(pos.x, pos.y, obj.pos.x, obj.pos.y)})
	let distToEdgeSphere = (dist(pos.x, pos.y, closestSphereToPos.pos.x, closestSphereToPos.pos.y)) * 2 - closestSphereToPos.radius

	noFill()
	stroke(255)
	circle(pos.x, pos.y, distToEdgeSphere)

	let edgeOfSpherePos = _.Vector.sub(end, pos)
	edgeOfSpherePos.normalize()
	edgeOfSpherePos.mul(distToEdgeSphere / 2)
	edgeOfSpherePos.add(pos)

	if (distToEdgeSphere > 10 && n - 1 > 0) march(edgeOfSpherePos, end, objs, n - 1)
	if (distToEdgeSphere < 4) collisionPoints.push(edgeOfSpherePos)

}

function incrementViewer() {
	viewerAngle += viewerSpeed
	viewerSight.y = sin(viewerAngle) * viewerLength
	viewerSight.x = cos(viewerAngle) * viewerLength

	// line should 'bounce' between top and bottom
	if (viewerSight.x < 0 || viewerSight.y < 0) viewerSpeed = -viewerSpeed
}

function drawSpheres(objs) {
	noStroke()
	fill(255)
	_.loop(objs, (el) => { ellipse(el.pos.x, el.pos.y, el.radius, el.radius) })
}

function drawViewer(pos, endpos) {
	fill(20)
	stroke(255)
	ellipse(pos.x, pos.y, 15, 15)
	line(pos.x, pos.y, endpos.x, endpos.y) 
}

function drawCollisionPoints(coll) {
	fill(255, 0, 0)
	stroke(255,0,0)
	_.loop(coll , el => circle(el.x, el.y, 2))
	// for (let i = 0; i < coll.length - 1; i++) {line(coll[i].x,coll[i].y,coll[i+1].x,coll[i+1].y)}
}