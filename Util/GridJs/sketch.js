
g = new Grid(3,3)

function r() {
    return Math.round((Math.random() + Number.EPSILON) * 100) / 100
}

g.setAll(r)

console.log(g.getAll([
    {x:0, y:0},
    {x:-1, y:0},
    {x:1, y:0},
    {x:1, y:1},
    {x:-1, y:1}
]))

console.log(g.getAllWrapAround([
    {x:0, y:0},
    {x:-1, y:0},
    {x:1, y:0},
    {x:1, y:1},
    {x:-1, y:1}
]))


console.log(g.toString())