console.log('====================================');
console.log('Early Completion');
console.log('====================================');

var it = (
    function* foo() {
        yield 1;
        yield 2;
        yield 3;
    }
)();

console.log(it.next());				// { value: 1, done: false }

console.log(it.return(42));		// { value: 42, done: true }

console.log(it.next());				// { value: undefined, done: true }


console.log('====================================');
console.log('Completion and finally');
console.log('====================================');

function* bar() {
    try {
        yield 1;
        yield 2;
        yield 3;
    }
    finally {
        console.log("cleanup!");
    }
}

for (var v of bar()) {
    console.log(v);
}
// 1 2 3
// cleanup!

var it = bar();

console.log(it.next());				// { value: 1, done: false }
it.return(42);		// cleanup!
// { value: 42, done: true }


console.log('====================================');
console.log('Early abort');
console.log('====================================');


var it = (
    function* foo() {
        yield 1;
        yield 2;
        yield 3;
    }
)();

it.next();				// { value: 1, done: false }

try {
    it.throw("Oops!");
}
catch (err) {
    console.log(err);	// Exception: Oops!
}

it.next();				// { value: undefined, done: true }


console.log('====================================');
console.log('Error handling');
console.log('====================================');

function *foo() {
	try {
		yield 1;
	}
	catch (err) {
		console.log( err );
	}

	yield 2;

	throw "Hello!";
}

var it = foo();

it.next();				// { value: 1, done: false }

try {
	it.throw( "Hi!" );	// Hi!
						// { value: 2, done: false }
	it.next();

	console.log( "never gets here" );
}
catch (err) {
	console.log( err );	// Hello!
}
