let objects = [];


let viewerPos;

let viewerSight;

let stepSize;

let viewerLength;
let viewerAngle;
let viewerSpeed;

let collisionPoints = [];

function setup() {
	createCanvas(1200, 600)

	// generating the objects => spheres 
	_.iterate(8, () => {
		let newCircle = _.createVector(_.randInt(width), _.randInt(height))
		objects.push({pos:newCircle, radius:_.randInt(90)})
	})

	// setting the viewer position
	viewerPos = _.createVector(50, 70)

	// the pos of where the viewer is looking at
	viewerSight = _.createVector(width, height)


	// the incremenet by wich we will look 
	stepSize = 25;

	viewerLength = 1500
	viewerAngle = 0;
	viewerSpeed = 0.001

}



function draw() {
	background(51)

	drawObjects(objects)

	stroke(255)
	line(viewerPos.x, viewerPos.y, viewerSight.x, viewerSight.y)
	// line(viewerPos.x, viewerPos.y, mouseX, mouseY)

	drawViewer(viewerPos)

	drawCollisionPoints(collisionPoints)
	march(viewerPos, viewerSight, objects, 15)

	// march(viewerPos, _.createVector(mouseX, mouseY), objects, 20)


	if (collisionPoints.length > 300) {
		collisionPoints.shift()
	}

	_.print(collisionPoints.length)

	viewerAngle += viewerSpeed

	viewerSight.y = sin(viewerAngle) * viewerLength

	viewerSight.x = cos(viewerAngle) * viewerLength


	if (viewerSight.x < 0 || viewerSight.y < 0) {
		viewerSpeed = -viewerSpeed
	}


}




function march(pos, end, objs, n) {

	// the next pos on the line
	// let stepPos = _.Vector.sub(end, pos)
	// stepPos.normalize()
	// stepPos.mul(step)
	// stepPos.add(pos)

	// noStroke()
	// fill(255)
	// circle(stepPos.x, stepPos.y, 8)

	// let iter = n - 1
	// if (iter > 0) {
	// 	march(stepPos, end, step, iter)
	// } 

	let closestObj = _.min(objs, (obj) => {return dist(pos.x, pos.y, obj.pos.x, obj.pos.y)})

	let radius = (dist(pos.x, pos.y, closestObj.pos.x, closestObj.pos.y)) * 2 - closestObj.radius

	noFill()
	stroke(255)
	circle(pos.x, pos.y, radius)

	let stepPos = _.Vector.sub(end, pos)
	stepPos.normalize()
	stepPos.mul(radius / 2)
	stepPos.add(pos)

	let iter = n - 1

	if (radius > 10 && iter > 0) {
		march(stepPos, end, objs, iter)
	}

	if (radius < 4) {
		console.log('collision')
		collisionPoints.push(stepPos)
	}






}




function pointOnEdge(pointPos, spherePos, radius) {


	let distanceToSphere = dist(pointPos.x, pointPos.y, spherePos.x, spherePos.y)
	
	if (distanceToSphere <= radius / 2) {
		return true
	} else {
		return false
	}



}


function sphereIsColliding(spherePos1, spherePos2, r1, r2) {

	let distanceBetweenSpheres = dist(spherePos1.x, spherePos1.y, spherePos2.x, spherePos2.y)

	if (distanceBetweenSpheres <= r1 + r2) {
		return true
	} else {
		return false
	}

}


function drawObjects(objs) {

	let w = 70

	noStroke()
	fill(255)

	_.loop(objs, (el, i) => {
		ellipse(el.pos.x, el.pos.y, el.radius, el.radius)
	})

}


function drawViewer(pos) {
	fill(20)
	stroke(255)

	let w = 15
	ellipse(pos.x, pos.y, w, w) 

}




function drawCollisionPoints(coll) {
	fill(255, 0, 0)
	stroke(255,0,0)
	_.loop(coll ,(el, i) => {
		circle(el.x, el.y, 2)
	})
}
























































// end
