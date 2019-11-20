console.log('====================================');
console.log('Iterators');
console.log('====================================');
console.log('String');

var greeting = "hello world";

var it = greeting[Symbol.iterator]();

console.log(it.next());		// { value: "h", done: false }
console.log(it.next());		// { value: "e", done: false }
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log('Map');
var m = new Map();
m.set("foo", 42);
m.set({ cool: true }, "hello world");

var it1 = m[Symbol.iterator]();
var it2 = m.entries();

console.log(it1.next());		// { value: [ "foo", 42 ], done: false }
console.log(it1.next());		// { value: [ "foo", 42 ], done: false }


console.log('CUSTOM iterator');
const Iterator = function () {
    let val = 0;
    return {
        next() {
            return { value: val++, done: val === 10 ? true : false }
        },
        return(){
            console.log('INSIDE RETURN METHOD: FINISHED RUNNING')
        },
        throw(){
            console.error('INSIDE THROW, ERROR OCCURED MAYBE?')
        }
    }
}



const cit = new  Iterator();
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.next())
console.log(cit.throw())


console.log('====================================');
console.log('Custom Iterator');
console.log('====================================');
var Fib = {
	[Symbol.iterator]() {
		var n1 = 1, n2 = 1;

		return {
			// make the iterator an iterable
			[Symbol.iterator]() { return this; },

			next() {
				var current = n2;
				n2 = n1;
				n1 = n1 + current;
				return { value: current, done: false };
			},

			return(v) {
				console.log(
					"Fibonacci sequence abandoned."
				);
				return { value: v, done: true };
			}
		};
	}
};

for (var v of Fib) {
	console.log( v );

	if (v > 50) break;
}
// 1 1 2 3 5 8 13 21 34 55
// Fibonacci sequence abandoned.


console.log('====================================');
console.log('Custom iterator for a series of tasks');
console.log('====================================');
var tasks = {
	[Symbol.iterator]() {
		var steps = this.actions.slice();

		return {
			// make the iterator an iterable
			[Symbol.iterator]() { return this; },

			next(...args) {
				if (steps.length > 0) {
					let res = steps.shift()( ...args );
					return { value: res, done: false };
				}
				else {
					return { done: true }
				}
			},

			return(v) {
				steps.length = 0;
				return { value: v, done: true };
			}
		};
	},
	actions: []
};



tasks.actions.push(
	function step1(x){
		console.log( "step 1:", x );
		return x * 2;
	},
	function step2(x,y){
		console.log( "step 2:", x, y );
		return x + (y * 2);
	},
	function step3(x,y,z){
		console.log( "step 3:", x, y, z );
		return (x * y) + z;
	}
);

var it = tasks[Symbol.iterator]();

console.log('LOG: ',it.next( 10 ));;			// step 1: 10
						// { value:   20, done: false }

console.log('LOG: ',it.next( 20, 50 ));;		// step 2: 20 50
						// { value:  120, done: false }

console.log('LOG: ',it.next( 20, 50, 120 ));;	// step 3: 20 50 120
						// { value: 1120, done: false }

console.log('LOG: ',it.next());;				// { done: true }


console.log('====================================');
console.log('Meta programming: defining iterator on Number');
console.log('====================================');

if (!Number.prototype[Symbol.iterator]) {
	Object.defineProperty(
		Number.prototype,
		Symbol.iterator,
		{
			writable: true,
			configurable: true,
			enumerable: false,
			value: function iterator(){
				var i, inc, done = false, top = +this;

				// iterate positively or negatively?
				inc = 1 * (top < 0 ? -1 : 1);

				return {
					// make the iterator itself an iterable!
					[Symbol.iterator](){ return this; },

					next() {
						if (!done) {
							// initial iteration always 0
							if (i == null) {
								i = 0;
							}
							// iterating positively
							else if (top >= 0) {
								i = Math.min(top,i + inc);
							}
							// iterating negatively
							else {
								i = Math.max(top,i + inc);
							}

							// done after this iteration?
							if (i == top) done = true;

							return { value: i, done: false };
						}
						else {
							return { done: true };
						}
					}
				};
			}
		}
	);
}

for (var i of 3) {
	console.log( i );
}
// 0 1 2 3

console.log([...-3]);				// [0,-1,-2,-3]
