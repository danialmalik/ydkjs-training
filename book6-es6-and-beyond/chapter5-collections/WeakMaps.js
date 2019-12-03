console.log('====================================');
console.log('Weak Maps');
console.log('====================================');


var m = new WeakMap();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );

console.log(m.has( x ));						// true
console.log(m.has( y ));						// false


console.log('WeakMaps do not have a size property or clear() method, nor do they expose any iterators over their keys, values, or entries.');


var m = new WeakMap();

var x = { id: 1 },
	y = { id: 2 },
	z = { id: 3 },
	w = { id: 4 };

m.set( x, y );

x = null;						// { id: 1 } is GC-eligible
y = null;						// { id: 2 } is GC-eligible
								// only because { id: 1 } is

m.set( z, w );

w = null;						// { id: 4 } is not GC-eligible
