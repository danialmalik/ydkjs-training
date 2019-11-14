console.log('====================================');
console.log('Intro');
console.log('====================================');

var sym = Symbol( "some optional description" );

console.log(typeof sym);		// "symbol"


console.log(sym instanceof Symbol);		// false

var symObj = Object( sym );
console.log(symObj instanceof Symbol);	// true

console.log(symObj.valueOf() === sym);	// true


// Two symbols with same string can be created but will be identically different
const a = Symbol('asd')
const b = Symbol('asd')
console.log(a)
console.log(b)
console.log(a == b) // false


console.log('====================================');
console.log('Singleton using Symbol');
console.log('====================================');
const INSTANCE = Symbol( "instance" );

function HappyFace() {
	if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];

	function smile() { console.log('Simled') }

	return HappyFace[INSTANCE] = {
		smile: smile
	};
}

var me = HappyFace(),
	you = HappyFace();

console.log(me === you);			// true



console.log('====================================');
console.log('Symbol Registry');
console.log('====================================');
console.log(
	`Symbol.for(..) is used to store symbols in global scope. it will look for the given description`,
	`in the registry. If found, returns the existing symbol, otherwise creates a new one.`
)
var s = Symbol.for( "something cool" );

var desc = Symbol.keyFor( s );
console.log( desc );			// "something cool"

// get the symbol from the registry again
var s2 = Symbol.for( desc );

console.log(s2 === s);						// true


console.log('====================================');
console.log('symbols as object properties');
console.log('====================================');

var o = {
	foo: 42,
	[ Symbol( "bar" ) ]: "hello world",
	baz: true
};

console.log(Object.getOwnPropertyNames( o ));	// [ "foo","baz" ]

console.log(Object.getOwnPropertySymbols( o ));	// [ Symbol(bar) ]
