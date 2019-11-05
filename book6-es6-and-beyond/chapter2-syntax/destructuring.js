function foo() {
    return [1, 2, 3];
}


function bar() {
    return {
        x: 100,
        y: 200,
        z: 300
    }
}


console.log('====================================');
console.log('Renaming');
console.log('====================================');
const { x: A, y: B, z: C } = bar();
console.log(A, B, C);

console.log('====================================');
console.log('Change to list');
console.log('====================================');
const arr1 = [v1, v2, v3] = foo();
console.log(v1, v2, v3);
console.log(arr1);

const arr = [];
({ x: arr[0], y: arr[1], z: arr[2] } = bar());
console.log(arr);


console.log('====================================');
console.log('Complex object operations');
console.log('====================================');
const test = {};

[test.a, test.b, test.c] = foo();
({ x: test.x, y: test.y, z: test.z } = bar());

console.log(test)


console.log('====================================');
console.log('Computed keys');
console.log('====================================');
var which = "x",
    o = {};

({ [which]: o[which] } = bar());

console.log(o.x);					// 4


console.log('====================================');
console.log('Nested Destructure');
console.log('====================================');
const obj = {
    a: {
        b:{
            c:{
                final:123
            }
        }
    }
}


const {
    a:{
        b:{
            c:{
                final
            }
        }
    }
} = obj



console.log(final)

var a1 = [ 1, [2, 3, 4], 5 ];
var o1 = { x: { y: { z: 6 } } };

var [ a, [ b, c, d ], e ] = a1;
var { x: { y: { z: w } } } = o1;

console.log( a, b, c, d, e );		// 1 2 3 4 5
console.log( w );


console.log('====================================');
console.log('Default value assignment');
console.log('====================================');
var [ a = 3, b = 6, c = 9, d = 12 ] = foo();
var { x = 5, y = 10, z = 15, w = 20 } = bar();

console.log( a, b, c, d );			// 1 2 3 12
console.log( x, y, z, w );			// 4 5 6 20


var { x, y, z, w: WW = 20 } = bar();
console.log( x, y, z, WW );			// 4 5 6 20


console.log('====================================');
console.log('Destructure Params');
console.log('====================================');

function parArr( [ x, y ] ) {
	console.log( x, y );
}

parArr( [ 1, 2 ] );					// 1 2
parArr( [ 1 ] );						// 1 undefined
parArr( [] );


function parrObj( { x, y } ) {
	console.log( x, y );
}

parrObj( { y: 1, x: 2 } );				// 2 1
parrObj( { y: 42 } );					// undefined 42
parrObj( {} );

console.log('====================================');
console.log('Default Params + Destructuring');
console.log('====================================');
function f6({ x = 10 } = {}, { y } = { y: 10 }) {
	console.log( x, y );
}

f6();								// 10 10
f6( undefined, undefined );			// 10 10
f6( {}, undefined );				// 10 10

f6( {}, {} );						// 10 undefined
f6( undefined, {} );				// 10 undefined

f6( { x: 2 }, { y: 3 } );			// 2 3
