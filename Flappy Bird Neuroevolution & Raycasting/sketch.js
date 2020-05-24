
// birds
let birdPopulation = [];
let populationSize;

// pipes
let pipeManager;
let count;

// rays & render
let camera;
let renderer;
let birdToFollow;

function setup() {
	createCanvas(1200, 600)

	// the pop. size 
	populationSize = 30

	// creating the new population
	_.iterate(populationSize, () => {
		bird = new Bird()
		bird.pos = createVector(100, height/2)
		birdPopulation.push(bird)
	})


	// the pipe manager
	pipeManager = new PipeManager()
	pipeManager.createPipe()

	// the camera
	camera = new Camera(-90, 90)

	camera.obstructRays(createVector(400, 0),createVector(400, height))

	// creating the renderer
	renderer = new Renderer(camera, createVector(600,0), {w:600,h:600})

	// picking a bird 
	birdToFollow = birdPopulation[_.randInt(birdPopulation.length-1)]

}




function draw() {
	background(51)

	pipeManager.show()
	pipeManager.removePairIf()
	pipeManager.addPipeEvery(100)

	for (let bird of birdPopulation) {

		if (pipeManager.collideWith(bird)) {
			bird.dead = true
		}

		if (birdToFollow.dead && bird.dead == false) {
			birdToFollow = bird
		}

		bird.show()
		bird.auto(pipeManager.nearestPipePair)

		if (keyIsPressed) {bird.jump()}

		bird.update()
		bird.limit(0, height)
		bird.gravity()

	}



	// camera stuff 
	camera.showRays()

	// letting the camera follow a bird
	camera.follow(birdToFollow.pos)

	// showing the camera
	camera.showCamera()

	// drawing all the obstacles
	camera.showObstacles()

	// letting the camera run
	camera.run()

	setObstacles()

	// drawing the screen 
	renderer.showScreen()

	// rendering
	renderer.render()

	rectMode(CORNER)
	


}







// function setObstacles() {

// 	let obst = []

// 	let top = pipeManager.nearestPipePair[0]
// 	let bot = pipeManager.nearestPipePair[1]

// 	let ob1 = {start:createVector(top.pos.x, 0), end:createVector(top.pos.x, top.h)}
// 	let ob2 = {start:createVector(top.pos.x, top.h), end:createVector(top.pos.x + top.w, top.h)}

// 	let ob3 = {start:createVector(bot.pos.x, height-bot.h), end:createVector(bot.pos.x, height)}
// 	let ob4 = {start:createVector(bot.pos.x, height-bot.h), end:createVector(bot.pos.x+bot.w, height-bot.h)}

// 	_.loop(camera.rays, (ray, i) => {
// 		camera.rays[i].obstacles = [ob1,ob2,ob3,ob4]
// 	})

// 	camera.obstacles = [ob1,ob2,ob3,ob4]


// }
function setObstacles() {

	let obst = []

	_.loop(pipeManager.pipes, (pair,i) => {
		let top = pair[0]
		let bot = pair[1]

		let ob1 = {start:createVector(top.pos.x, 0), end:createVector(top.pos.x, top.h)}
		let ob2 = {start:createVector(top.pos.x, top.h), end:createVector(top.pos.x + top.w, top.h)}

		let ob3 = {start:createVector(bot.pos.x, height-bot.h), end:createVector(bot.pos.x, height)}
		let ob4 = {start:createVector(bot.pos.x, height-bot.h), end:createVector(bot.pos.x+bot.w, height-bot.h)}

		obst = _.extend(obst, [ob1, ob2, ob3, ob4])
	})



	_.loop(camera.rays, (ray, i) => {
		camera.rays[i].obstacles = obst
	})

	camera.obstacles = obst


}




























// end