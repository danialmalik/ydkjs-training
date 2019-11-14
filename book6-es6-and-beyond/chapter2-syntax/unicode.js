console.log('====================================');
console.log('New Syntax');
console.log('====================================');
// es5
var gclef = "\uD834\uDD1E";
console.log(gclef);

// es6
var gclef = "\u{1D11E}";
console.log(gclef);


console.log('====================================');
console.log('Unicode aware string ops');
console.log('====================================');
var snowman = "☃";
console.log(snowman.length);					// 1

var gclef = "𝄞";
console.log(gclef.length);

console.log('====================================');
console.log('Normalize to find lengths');
console.log('====================================');

var s1 = "\xE9",
	s2 = "e\u0301";

console.log(s1);
console.log(s2);

console.log(s1.length);
console.log(s2.length);

console.log(s1.normalize());
console.log(s2.normalize());

console.log(s1.normalize().length);			// 1
console.log(s2.normalize().length);			// 1

console.log(s1 === s2);						// false
console.log(s1 === s2.normalize());			// true
