console.log('====================================');
console.log('Bases');
console.log('====================================');

console.log('The only decimal form allowed is base-10. Octal, hexadecimal, and binary are all integer forms.')
var dec = 42,
	oct = 0o52,			// or `0O52` :(
	hex = 0x2a,			// or `0X2a` :/
    bin = 0b101010;		// or `0B101010` :/


console.log(dec, oct, hex, bin)


var a = 42;

console.log(a.toString());			// "42" -- also `a.toString( 10 )`
console.log(a.toString( 8 ));		// "52"
console.log(a.toString( 16 ));		// "2a"
console.log(a.toString( 2 ));		// "101010"
