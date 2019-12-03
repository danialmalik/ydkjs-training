console.log('====================================');
console.log('Sets');
console.log('====================================');
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );
s.add( x );

console.log(s.size);							// 2

s.delete( y );
console.log(s.size);							// 1

s.clear();
console.log(s.size);							// 0

console.log('====================================');
console.log('Constructor');
console.log('====================================');
var x = { id: 1 },
	y = { id: 2 };

var s = new Set( [x,y] )
console.log(s);

console.log('====================================');
console.log('No retrieving. only can use `has`()');
console.log('====================================');

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

console.log('Keys: ',keys,'\n','Vals: ',vals,'\n','Entries :',entries);

console.log(keys[0] === x);
console.log(keys[1] === y);

console.log(vals[0] === x);
console.log(vals[1] === y);

console.log(entries[0][0] === x);
console.log(entries[0][1] === x);
console.log(entries[1][0] === y);
console.log(entries[1][1] === y);

console.log('====================================');
console.log('Uniqueness');
console.log('====================================');
var s = new Set( [1,2,3,4,"1",2,4,"5"] ),
	uniques = [ ...s ];

console.log(uniques);						// [1,2,3,4,"1","5"]

console.log('====================================');
console.log('Weaksets');
console.log('====================================');
var s = new WeakSet();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );

x = null;						// `x` is GC-eligible
y = null;						// `y` is GC-eligible

console.log('Running')
console.log('====================================');
console.log('Sets');
console.log('====================================');
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );
s.add( x );

console.log(s.size);							// 2

s.delete( y );
console.log(s.size);							// 1

s.clear();
console.log(s.size);							// 0

console.log('====================================');
console.log('Constructor');
console.log('====================================');
var x = { id: 1 },
	y = { id: 2 };

var s = new Set( [x,y] )
console.log(s);

console.log('====================================');
console.log('No retrieving. only can use `has`()');
console.log('====================================');

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

console.log('Keys: ',keys,'\n','Vals: ',vals,'\n','Entries :',entries);

console.log(keys[0] === x);
console.log(keys[1] === y);

console.log(vals[0] === x);
console.log(vals[1] === y);

console.log(entries[0][0] === x);
console.log(entries[0][1] === x);
console.log(entries[1][0] === y);
console.log(entries[1][1] === y);

console.log('====================================');
console.log('Uniqueness');
console.log('====================================');
var s = new Set( [1,2,3,4,"1",2,4,"5"] ),
	uniques = [ ...s ];

console.log(uniques);						// [1,2,3,4,"1","5"]

console.log('====================================');
console.log('Weaksets');
console.log('====================================');
var s = new WeakSet();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );

x = null;						// `x` is GC-eligible
y = null;						// `y` is GC-eligible

console.log('Running')
