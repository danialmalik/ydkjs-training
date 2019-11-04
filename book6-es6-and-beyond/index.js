console.log('====================================');
console.log('Demo');
console.log('====================================');
const obj = {
    a: {c:12}
}


const {a: {c: newKey}} = obj
console.log(newKey)


console.log('====================================');
console.log('first');
console.log('====================================');

var aa = 10, bb = 20;

var o = { x: aa, y: bb };
var     { x: AA, y: BB } = o;

console.log( AA, BB );				// 10 20
