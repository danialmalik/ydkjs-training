console.log('====================================');
console.log('Simple Generator');
console.log('====================================');
var x = 1;

function *foo() {
    console.log('started')
	x++;
	yield; // pause!
	console.log( "x:", x );
}

function bar() {
	x++;
}

// construct an iterator `it` to control the generator
var it = foo();
console.log('created')
// start `foo()` here!
it.next();
console.log('first next called')

console.log(x);						// 2
bar();
console.log(x);						// 3
it.next();
console.log('second next called')
console.log(x);						// 4


console.log('====================================');
console.log('Gernator Input output');
console.log('====================================');
console.log('Generators dont run when called. They are run when `next` is called');

function *foo(x,y) {
	return x * y;
}

var it = foo( 6, 7 );

var res = it.next();

console.log('Res: ',res.value);
