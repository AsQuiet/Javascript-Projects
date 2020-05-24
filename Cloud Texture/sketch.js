let dots = [];


let dotSize = 7

let pxls;

function setup() {
	createCanvas(600, 600)

	_.iterate(30, () => {

		let xx = _.floor(_.randInt(width) / dotSize) * dotSize
		let yy = _.floor(_.randInt(height) / dotSize) * dotSize
		let newDot = _.createVector(xx, yy)
		dots.push(newDot)
	})


	pxls = _.doubleArray(ceil(width/dotSize), ceil(height/dotSize))

	let pxlsAmount = ceil(width/dotSize) * ceil(height/dotSize)
	let diagonal = sqrt(width * width + height * height)

	_.doubleLoop(pxls, (el, i, j) => {
		let closestDot = _.min(dots, (dot) => {return dist(i*dotSize, j*dotSize, dot.x, dot.y)})
		distToClo = dist(i*dotSize, j*dotSize, closestDot.x, closestDot.y)

		let v = map(distToClo, 0, diagonal*0.25, 255, 0)

		pxls[i][j] = v


		console.log((i * pxls[0].length + j) / pxlsAmount * 100 )	
	})







}


function draw() {
	background(51)	

	_.doubleLoop(pxls, (el, i, j) => {
		fill(el)
		noStroke()
		rect(i * dotSize, j * dotSize, dotSize, dotSize)
	})

	noLoop()


}




function drawDots(d) {
	noStroke()
	fill(200,0, 0)
	_.loop(d, (el) => {
		rect(el.x, el.y, dotSize, dotSize)
	})
}














































//ed