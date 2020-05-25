
let mapWidth
let mapHeight
let noiseMap = []
function setup() {
	createCanvas(600, 600);
	mapWidth = width;
	mapHeight = height;
	noiseMap = generatePerlinNoise(width, height, 45.85, 3, 0.73,1.65)
}


function draw() {

	// drawing an actual map
	mapWidth = 150;
	mapHeight = 150;

	sizeX = width / mapWidth
	sizeY = height / mapHeight

	noStroke()
	for (let x = 0;  x < mapWidth; x++) {

		for	(let y = 0; y < mapHeight; y++) {

			let index = x + y * height

			parseNoise(noiseMap[index])

			rect(x * sizeX, y * sizeY, sizeX, sizeY)

		}

	}

	if (keyIsPressed) {
		noiseMap = generatePerlinNoise(width, height, random(1, 100), round(random(1,8)), random(),random(1,10))
	}

	

}

function generatePerlinNoise(mapWidth, mapHeight, scl, octaves, persistance, lacunarity) {
	noiseSeed(random(100))
	// conains all the noise data
	noiseMap = [];

	// 
	recordHeight = -Infinity;
	recordLowest = Infinity;

	for (let x = 0;  x < mapWidth; x++) {

		for	(let y = 0; y < mapHeight; y++) {

			amplitude = 1.0;
			freq = 1;
			noiseHeight = 0;

			for (let i = 0; i < octaves; i++) {

				sampleX = x / scl * freq;
				sampleY = y / scl * freq;

				// converting from range of -1 1 to 0 1
				perlinValue = noise(sampleX, sampleY);

				noiseHeight += perlinValue * amplitude;

				amplitude *= persistance;
				freq *= lacunarity;


			}

			noiseMap.push(noiseHeight);

			if (noiseHeight > recordHeight) {
				recordHeight = noiseHeight
			} else if (noiseHeight < recordLowest) {
				recordLowest = noiseHeight
			}


		}

	}

	// normalizing
	for (let i = 0; i < noiseMap.length; i++) {
		noiseMap[i] = map(lerp(recordHeight, recordLowest, noiseMap[i]), -1, 1, 0, 1);
	}
	console.log(noiseMap)

	return noiseMap

}



function parseNoise(value) {
	if (value < 0.65) {
		fill(66, 135, 245) // ocean
	} else if (value < 0.7) {
		fill(255, 245, 46) // beach
	} else if (value < 0.8) {
		fill(107, 242, 141)
	} else {
		fill(133, 131, 102)// grass
	}
}