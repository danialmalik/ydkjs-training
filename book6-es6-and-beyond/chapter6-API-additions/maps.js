console.log('====================================');
console.log('Maps');
console.log('====================================');


console.log('====================================');
console.log('Weak maps');
console.log('====================================');
console.log('automatic garbage collection if there is no reference to key objects. Has no keys, values or entries method')
var m = new WeakMap();

var x = { id: 1 },
	y = { id: 2 },
	z = { id: 3 },
	w = { id: 4 };

m.set(x, y);
x = null;						// { id: 1 } is GC-eligible
y = null;						// { id: 2 } is GC-eligible
// only because { id: 1 } is
console.log(m.has(x))

m.set(z, w);

// z = null;
w = null;						// { id: 4 } is not GC-eligible since {id:3} (z) is not

console.log(m.has(z))



console.log('====================================');
console.log('Comparison with map');
console.log('====================================');
{
	var m = new Map();

	var x = { id: 1 },
		y = { id: 2 },
		z = { id: 3 },
		w = { id: 4 };

	m.set(x, y);

	x = null;						// { id: 1 } is GC-eligible
	y = null;						// { id: 2 } is GC-eligible
	// only because { id: 1 } is
	console.log(m.has(x))

	m.set(z, w);

	// z = null;
	w = null;						// { id: 4 } is not GC-eligible since {id:3} (z) is not

	console.log(m.has(z))
}
