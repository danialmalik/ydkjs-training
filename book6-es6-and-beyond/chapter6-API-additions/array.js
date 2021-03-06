console.log('====================================');
console.log('Array: of');
console.log('====================================');
var a = Array(3);
console.log(a.length);						// 3
console.log(a[0]);							// undefined

var b = Array.of(3);
console.log(b.length);						// 1
console.log(b[0]);							// 3

var c = Array.of(1, 2, 3);
console.log(c.length);						// 3
console.log(c);								// [1,2,3]


console.log('====================================');
console.log('Use Case (of): When extending `Array`');
console.log('====================================');


class MyCoolArray extends Array {
	sum() {
		return this.reduce(function reducer(acc, curr) {
			return acc + curr;
		}, 0);
	}
}

var x = new MyCoolArray(3);
console.log(x.length);						// 3 -- oops!
console.log(x.sum());						// 0 -- oops!

var y = [3];					// Array, not MyCoolArray
console.log(y.length);						// 1
try {
	console.log(y.sum());						// `sum` is not a function
} catch (ex) {
	console.error(ex.message)
}

var z = MyCoolArray.of(3);
console.log(z.length);						// 1
console.log(z.sum());						// 3


console.log('====================================');
console.log('Array.from()');
console.log('====================================');
//An "array-like object" in JavaScript is an object that has a length property on it, specifically with an integer value of zero or higher.


var arrLike = {
	length: 3, // last item will be an "empty item"
	0: "foo",
	1: "bar"
};

console.log('Pre es6 ->');
var arr = Array.prototype.slice.call(arrLike);
console.log(arr);

var arr2 = arr.slice();
console.log(arr2);

console.log('es6 ->');

var arr = Array.from(arrLike);
var arrCopy = Array.from(arr);
console.log(arr)
console.log(arrCopy)

console.log('---------------')
console.log('GOTCHA')
var arrLike = {
	length: 4,
	2: "foo"
};

console.log(Array.from(arrLike));
// [ undefined, undefined, "foo", undefined ]

// Same as
var emptySlotsArr = [];
emptySlotsArr.length = 4;
emptySlotsArr[2] = "foo";

console.log(Array.from(emptySlotsArr));
// [ undefined, undefined, "foo", undefined ]


console.log('====================================');
console.log('Avoiding Empty Slots');
console.log('====================================');

var a = Array(4);								// four empty slots!

var b = Array.apply(null, { length: 4 });		// four `undefined` values

console.log(a)
console.log(b)

var c = Array.from({ length: 4 });			// four `undefined` values
console.log(c)

console.log('====================================');
console.log('mapping');
console.log('====================================');

var arrLike = {
	length: 4,
	2: "foo"
};

Array.from(arrLike, function mapper(val, idx) { // third optional argument is for "This" binding
	if (typeof val == "string") {
		return val.toUpperCase();
	}
	else {
		return idx;
	}
});
// [ 0, 1, "FOO", 3 ]


console.log('====================================');
console.log('Creating Arrays and Subtypes');
console.log('====================================');
// resulting instance's type depends upon the type the method was called from
console.log(MyCoolArray.from([1, 2]) instanceof MyCoolArray);	// true

console.log(Array.from(
	MyCoolArray.from([1, 2])
) instanceof MyCoolArray);							// false


var x = new MyCoolArray(1, 2, 3);

console.log(x.slice(1) instanceof MyCoolArray);				// true

console.log('overriding this default behavior');
{
	class MyCoolArray extends Array {
		// force `species` to be parent constructor
		static get [Symbol.species]() { return Array; }
	}

	var x = new MyCoolArray(1, 2, 3);

	console.log(x.slice(1) instanceof MyCoolArray);				// false
	console.log(x.slice(1) instanceof Array);						// true
}


//
// It's important to note that the @@species setting is only used for the prototype methods,
// like slice(..). It's not used by of(..) and from(..); they both just use the this binding
// (whatever constructor is used to make the reference).
// Consider:
console.log('does not work with methods that use `this` binding like `of` and `from`')
{
	class MyCoolArray extends Array {
		// force `species` to be parent constructor
		static get [Symbol.species]() { return Array; }
	}

	var x = new MyCoolArray( 1, 2, 3 );

	console.log(MyCoolArray.from( x ) instanceof MyCoolArray);		// true
	console.log(MyCoolArray.of( [2, 3] ) instanceof MyCoolArray);	// true
}


console.log('====================================');
console.log(':CopyWithin method');
console.log('====================================');

console.log([1,2,3,4,5].copyWithin( 3, 0 ));			// [1,2,3,1,2]

console.log([1,2,3,4,5].copyWithin( 3, 0, 1 ));		// [1,2,3,1,5]

console.log([1,2,3,4,5].copyWithin( 0, -2 ));		// [4,5,3,4,5]

console.log([1,2,3,4,5].copyWithin( 0, -2, -1 ));	// [4,2,3,4,5]


console.log('====================================');
console.log('fill Method');
console.log('====================================');

var a = Array( 4 ).fill( undefined );
console.log(a);
// [undefined,undefined,undefined,undefined]

// params: value, start, end
var a = [ null, null, null, null ].fill( 42, 1, 3 );
console.log(a);

console.log('====================================');
console.log('find method');
console.log('====================================');


console.log('====> using indexOf')
var a = [1,2,3,4,5];

console.log(a.indexOf( 3 ) != -1);				// true
console.log(a.indexOf( 7 ) != -1);				// false

console.log(a.indexOf( "2" ) != -1);			// false


console.log('This does type strict comparison. ES5 workaround:')
var a = [1,2,3,4,5];

console.log(a.some( function matcher(v){
	return v == "2";
} ));								// true

console.log(a.some( function matcher(v){
	return v == 7;
} ));								// false


console.log('ES6: Find method');
var a = [1,2,3,4,5];

console.log(a.find( function matcher(v){
	return v == "2";
} ));								// 2

console.log(a.find( function matcher(v){
	return v == 7;					// undefined
}));


console.log('Custom matcher');
var points = [
	{ x: 10, y: 20 },
	{ x: 20, y: 30 },
	{ x: 30, y: 40 },
	{ x: 40, y: 50 },
	{ x: 50, y: 60 }
];

console.log(points.find( function matcher(point) {
	return (
		point.x % 3 == 0 &&
		point.y % 4 == 0
	);
} ));								// { x: 30, y: 40 }
