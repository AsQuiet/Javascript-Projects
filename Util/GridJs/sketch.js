
g = new Grid(10,10)

g.setAll(Math.random)

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


console.log(g)