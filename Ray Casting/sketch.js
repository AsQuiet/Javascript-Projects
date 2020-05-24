

let cam;

let camSpeed;


function setup() {
	createCanvas(600, 600)

	// creating the camera object
	cam = new Camera(0, 90)

	// the speed at wich the camera will rotate
	camSpeed = 2

	// generating some random walls
	_.iterate(5, (i) => {

		let start = createVector(_.randInt(width), _.randInt(height))
		let end = createVector(_.randInt(width), _.randInt(height))
		cam.obstructRays(start, end)

	})

	console.log(noise(2.3, 4.3));

}


function draw() {
	background(30)

	// drawing the camera's rays
	cam.showRays()

	// letting the camera follow the mouse
	cam.follow(createVector(mouseX, mouseY))

	// drawing all the obstacles
	cam.showObstacles()

	// letting the camera run
	cam.run()

	// drawing the camera
	cam.showCamera()

	// rotating the camera
	if (keyIsDown(LEFT_ARROW)) {
		cam.rotate(-camSpeed)
	}

	if (keyIsDown(RIGHT_ARROW)) {
		cam.rotate(camSpeed)
	}
	



}




function isIntersecting(p1, p2, p3, p4) {

	let x1 = p1.x, x2 = p2.x, x3 = p3.x, x4 = p4.x
	let y1 = p1.y, y2 = p2.y, y3 = p3.y, y4 = p4.y

	let d = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4)

	if (d==0) {
		return false
	}

	let t = (x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)
	let u = (x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)

	t = t / d
	u = u / d

	let uInter = abs(u) <= 1 && abs(u) >= 0
	let tInter = t <= 1 && t >= 0

	let intersection = createVector()

	if (uInter) {
		intersection.x = x3 + u * (x4 - x3)
		intersection.y = y3 + u * (y4 - y3)
	}

	if (tInter) {
		intersection.x = x1 + t * (x2 - x1)
		intersection.y = y1 + t * (y2 - y1)
	}

	return {intersection:uInter || tInter, pos:intersection}

}











// end