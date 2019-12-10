console.log('====================================');
console.log('Meta properties');
console.log('====================================');

class Parent {
	constructor() {
		if (new.target === Parent) {
			console.log( "Parent instantiated" );
		}
		else {
			console.log( "A child instantiated" );
		}
	}
}

class Child extends Parent {}

var a = new Parent();
// Parent instantiated

var b = new Child();
// A child instantiated


console.log('====================================');
console.log('WELL KNOWN SYMBOLS');
console.log('====================================');

console.log('====================================');
console.log('Symbol.iterator');
console.log('====================================');


var arr = [4,5,6,7,8,9];

for (var v of arr) {
	console.log( v );
}
// 4 5 6 7 8 9

// define iterator that only produces values
// from odd indexes
arr[Symbol.iterator] = function*() {
	var idx = 1;
	do {
		yield this[idx];
	} while ((idx += 2) < this.length);
};

for (var v of arr) {
	console.log( v );
}
// 5 7 9


console.log('====================================');
console.log('Symbol.toStringTag and Symbol.hasInstance');
console.log('====================================');


// Pre-ES6
function Foo() {}

var a = new Foo();

a.toString();				// [object Object]
a instanceof Foo;			// true

// Post ES6

function Foo(greeting) {
	this.greeting = greeting;
}

Foo.prototype[Symbol.toStringTag] = "Foo";

Object.defineProperty( Foo, Symbol.hasInstance, {
	value: function(inst) {
		return inst.greeting == "hello";
	}
} );

var a = new Foo( "hello" ),
	b = new Foo( "world" );

b[Symbol.toStringTag] = "cool";

a.toString();				// [object Foo]
String( b );				// [object cool]

a instanceof Foo;			// true
b instanceof Foo;			// false


console.log('====================================');
console.log('Symbol.species');
console.log('====================================');
{
	class Cool {
		// defer `@@species` to derived constructor
		// default behavior
		static get [Symbol.species]() { return this; }

		again() {
			return new this.constructor[Symbol.species]();
		}
	}

	class Fun extends Cool {}

	class Awesome extends Cool {
		// force `@@species` to be parent constructor
		static get [Symbol.species]() { return Cool; }
	}

	var a = new Fun(),
		b = new Awesome(),
		c = a.again(),
		d = b.again();

	console.log(c instanceof Fun);			// true
	console.log(d instanceof Awesome);		// false
	console.log(d instanceof Cool);			// true
}
