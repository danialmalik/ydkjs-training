console.log('====================================');
console.log('Iteration: Passing values');
console.log('====================================');

function *foo(x) {
	var y = x * (yield);
	return y;
}

var it = foo( 6 );

// start `foo(..)`

it.next(); // will stop at yield

var res = it.next( 7 );

console.log(res.value);		// 42


console.log('====================================');
console.log('Get and pass values to yield');
console.log('====================================');

function *foo(x) {
	var y = x * (yield "Hello");	// <-- yield a value!
	return y;
}

var it = foo( 6 );

var res = it.next();	// first `next()`, don't pass anything
console.log(res.value);				// "Hello"

res = it.next( 7 );		// pass `7` to waiting `yield`
console.log(res.value);				// 42
