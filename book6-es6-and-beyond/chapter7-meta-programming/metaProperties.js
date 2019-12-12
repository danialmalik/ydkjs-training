console.log('====================================');
console.log('Meta properties');
console.log('====================================');

class Parent {
	constructor() {
		if (new.target === Parent) {
			console.log("Parent instantiated");
		}
		else {
			console.log("A child instantiated");
		}
	}
}

class Child extends Parent { }

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


var arr = [4, 5, 6, 7, 8, 9];

for (var v of arr) {
	console.log(v);
}
// 4 5 6 7 8 9

// define iterator that only produces values
// from odd indexes
arr[Symbol.iterator] = function* () {
	var idx = 1;
	do {
		yield this[idx];
	} while ((idx += 2) < this.length);
};

for (var v of arr) {
	console.log(v);
}
// 5 7 9


console.log('====================================');
console.log('Symbol.toStringTag and Symbol.hasInstance');
console.log('====================================');


// Pre-ES6
function Foo() { }

var a = new Foo();

a.toString();				// [object Object]
a instanceof Foo;			// true

// Post ES6

function Foo(greeting) {
	this.greeting = greeting;
}

Foo.prototype[Symbol.toStringTag] = "Foo";

Object.defineProperty(Foo, Symbol.hasInstance, {
	value: function (inst) {
		return inst.greeting == "hello";
	}
});

var a = new Foo("hello"),
	b = new Foo("world");

b[Symbol.toStringTag] = "cool";

a.toString();				// [object Foo]
String(b);				// [object cool]

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

	class Fun extends Cool { }

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


console.log('====================================');
console.log('Symbol.toPrimitive');
console.log('====================================');

{
	var arr = [1, 2, 3, 4, 5];

	arr + 10;				// 1,2,3,4,510

	arr[Symbol.toPrimitive] = function (hint) {
		if (hint == "default" || hint == "number") {
			// sum all numbers
			return this.reduce(function (acc, curr) {
				return acc + curr;
			}, 0);
		}
	};

	console.log(arr + 10);				// 25
}


console.log('====================================');
console.log('Symbol.isConcatSpreadable');
console.log('====================================');
// The @@isConcatSpreadable symbol can be defined as a boolean property (Symbol.isConcatSpreadable) on
// any object (like an array or other iterable) to indicate if it should be spread out if passed to an
// array concat(..).
var a = [1, 2, 3],
	b = [4, 5, 6];

b[Symbol.isConcatSpreadable] = false;

console.log([].concat(a, b));		// [1,2,3,[4,5,6]]

console.log('====================================');
console.log('Symbol.unscopables');
console.log('====================================');

// The @@unscopables symbol can be defined as an object property (Symbol.unscopables)
// on any object to indicate which properties can and cannot be exposed as lexical
// variables in a with statement.

var o = { a: 1, b: 2, c: 3 },
	a = 10, b = 20, c = 30;

o[Symbol.unscopables] = {
	a: false,
	b: true,
	c: false
};

with (o) {
	console.log(a, b, c);		// 1 20 3
}
