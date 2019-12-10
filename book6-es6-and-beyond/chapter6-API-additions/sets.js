console.log('====================================');
console.log('Sets');
console.log('====================================');

var x = { id: 1 },
	y = { id: 2 };

var s = new Set( [x,y] );
console.log(s)


console.log("A set doesn't need a get(..) because you don't retrieve a value from a set, but rather test if it is present or not, using has(..)")

var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );

console.log(s.has( x ));						// true
console.log(s.has( y ));						// false


console.log('====================================');
console.log('Set iterators');
console.log('====================================');

var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x ).add( y );

var keys = [ ...s.keys() ],
	vals = [ ...s.values() ],
	entries = [ ...s.entries() ];

console.log(keys[0] === x);
console.log(keys[1] === y);

console.log(vals[0] === x);
console.log(vals[1] === y);

console.log(entries[0][0] === x);
console.log(entries[0][1] === x);
console.log(entries[1][0] === y);
console.log(entries[1][1] === y);
