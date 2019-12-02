console.log('====================================');
console.log('MAPS: ');
console.log('====================================');


console.log('>>>>>>Objects');
var m = {};

var x = { id: 1 },
	y = { id: 2 };

m[x] = "foo";
m[y] = "bar";

console.log(m[x]);							// "bar"
console.log(m[y]);							// "bar"
console.log('both objects stringify into "[Object object]"');


console.log('====================================');
console.log('FAKE maps');
console.log('====================================');
var keys = [], vals = [];

var x = { id: 1 },
	y = { id: 2 };

keys.push( x );
vals.push( "foo" );

keys.push( y );
vals.push( "bar" );

console.log(keys[0] === x);					// true
console.log(vals[0]);						// "foo"

console.log(keys[1] === y);					// true
console.log(vals[1]);						// "bar"

console.log('====================================');
console.log('ES6 Maps');
console.log('====================================');
console.log('Cant use []. set, get, delete are used for operations');

var m = new Map();

var x = { id: 1 },
	y = { id: 2 };

console.log('set x -> ',m.set( x, "foo" ));
console.log('set y -> ',m.set( y, "bar" ));

console.log('get x ->',m.get( x ));						// "foo"
console.log('get y ->',m.get( y ));						// "bar"


console.log(m.set( x, "foo" ));
console.log(m.set( y, "bar" ));

console.log('delete y ->',m.delete( y ));

console.log(m.set( x, "foo" ));
console.log(m.set( y, "bar" ));
console.log(m.size);							// 2

console.log('====================================');
console.log('Copying map using constructor');
console.log('====================================');
var m2 = new Map( m.entries() );

// same as:
var m2 = new Map( m );
console.log(m);
console.log(m2);

console.log('clear map -> ',m.clear());
console.log(m.size);							// 0

console.log(m);
console.log(m2);

console.log('====================================');
console.log('Constructor');
console.log('====================================');
var x = { id: 1 },
	y = { id: 2 };

var m = new Map( [
	[ x, "foo" ],
	[ y, "bar" ]
] );

console.log(m.get( x ));						// "foo"
console.log(m.get( y ));						// "bar"


console.log('====================================');
console.log('Map values');
console.log('====================================');
var m = new Map();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );
m.set( y, "bar" );

var vals = [ ...m.values() ];

console.log(m.values())                      // Iterator
console.log(vals);							// ["foo","bar"]
console.log(Array.from( m.values() ));		// ["foo","bar"]

console.log('====================================');
console.log('Iterate over map entries');
console.log('====================================');

var m = new Map();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );
m.set( y, "bar" );

var vals = [ ...m.entries() ];

console.log(vals[0][0] === x);				// true
console.log(vals[0][1]);						// "foo"

console.log(vals[1][0] === y);				// true
console.log(vals[1][1]);						// "bar"

console.log('====================================');
console.log('Map Keys');
console.log('====================================');

var m = new Map();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );
m.set( y, "bar" );

var keys = [ ...m.keys() ];

console.log(keys[0] === x);					// true
console.log(keys[1] === y);					// true

console.log('====================================');
console.log('Map keys: Has');
console.log('====================================');

var m = new Map();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );

console.log(m.has( x ));						// true
console.log(m.has( y ));						// false
