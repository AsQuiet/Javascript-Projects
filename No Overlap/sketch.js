
let shapes = []

function setup() {
	createCanvas(600, 400)

	generateShapes()	

}


function draw() {
	background(51)

	fill(180, 100)
	stroke(255)
	for (let i = 0; i < shapes.length; i++) {
		shapes[i].drawShape()
	}

}

function generateShapes() {

	let amount = 15
	let attempts = 30

	for (let i = 0; i < amount; i++) {
		
		let found;

		for (let j = 0; j < attempts; j++) {

			// creating a random shape
			let shape = createRandomShape()

			// are we colliding with any shape
			let col = false

			// testing if it's colliding
			for (let x = 0; x < shapes.length; x++) {
				if (collision.polyPoly(shape, shapes[x],true)) {
					col = true
					break;
				}
				console.log(x)
			}
			
			if (col == false) {
				found = shape
				break;
			}

		}

		if (found != undefined) {
			shapes.push(found)
		}

	}
	console.log(shapes)
}

function createRandomShape() {
	let shape = undefined

	// random properties
	let x = floor(random(width))
	let y = floor(random(height))
	let w = floor(random(30, 100))
	let h = floor(random(30, 100))

	// generating the shape 
	let type = floor(random(3))
	switch (type) {
		case 0: shape = collision.gen.createRect(x,y,w,h);break;
		case 1: shape = collision.gen.createRectCenter(x,y,w,h);break;
		case 2: shape = collision.gen.createCircle(x,y,w);break;
		case 3: shape = collision.gen.createEllipse(x,y,w,h);break;
	}
	console.log(type)

	return shape
}