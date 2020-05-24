

let cam;

let camSpeed;

let renderer;


function setup() {
	createCanvas(1200, 600)

	// creating the camera object
	cam = new Camera(0, 50)

	// the speed at wich the camera will rotate
	camSpeed = 5

	// creating the renderer
	renderer = new Renderer(cam, createVector(600,0), {w:600,h:600})

	// generating some random walls
	// _.iterate(7, (i) => {

	// 	let start = createVector(_.randInt(width/2), _.randInt(height))
	// 	let end = createVector(_.randInt(width/2), _.randInt(height))
	// 	cam.obstructRays(start, end)

	// })

	cam.obstructRays(createVector(100,100),createVector(500,100))
	cam.obstructRays(createVector(100,500),createVector(500,500))
	cam.obstructRays(createVector(100,100),createVector(100,500))
	cam.obstructRays(createVector(500,100),createVector(500,500))

	cam.obstructRays(createVector(250,250),createVector(350,250))
	cam.obstructRays(createVector(250,350),createVector(350,350))
	
	cam.obstructRays(createVector(250,250),createVector(250,350))
	cam.obstructRays(createVector(350,250),createVector(350,350))
	





}


function draw() {
	background(30)

	// drawing the camera's rays
	cam.showRays()

	// determining the limits of the pos
	let clampedMouseX = _.clamp(mouseX, 0, width/2)
	let clampedMouseY = _.clamp(mouseY, 0, height)

	// letting the camera follow the mouse
	cam.follow(createVector(clampedMouseX, clampedMouseY))

	// drawing all the obstacles
	cam.showObstacles()

	// letting the camera run
	cam.run()

	// drawing the camera
	cam.showCamera()

	// limiting the camerar
	// cam.limitPosition(0, width/2, 0, height)

	// drawing the screen 
	renderer.showScreen()

	// rendering
	renderer.render()

	rectMode(CORNER)

	// rotating the camera
	if (keyIsDown(LEFT_ARROW)) {
		cam.rotate(-camSpeed)
	}

	if (keyIsDown(RIGHT_ARROW)) {
		cam.rotate(camSpeed)
	}
	



}



/*
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


*/








// end