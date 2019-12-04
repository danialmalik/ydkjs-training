console.log('====================================');
console.log('Array: of');
console.log('====================================');
var a = Array( 3 );
console.log(a.length);						// 3
console.log(a[0]);							// undefined

var b = Array.of( 3 );
console.log(b.length);						// 1
console.log(b[0]);							// 3

var c = Array.of( 1, 2, 3 );
console.log(c.length);						// 3
console.log(c);								// [1,2,3]
