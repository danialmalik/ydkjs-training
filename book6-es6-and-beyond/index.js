console.log('====================================');
console.log('Unicode');
console.log('====================================');
console.log(/𝄞/.test( "𝄞-clef" ));


console.log(/^.-clef/ .test( "𝄞-clef" ));		// false
console.log(/^.-clef/u.test( "𝄞-clef" ));		// true


console.log("𝄞".length)        // 2;

console.log('====================================');
console.log('Sticky Flag');
console.log('====================================');

console.log('Without');

var re1 = /foo/,
	str = "++foo++";
    console.log(re1.lastIndex);			// 0
    console.log(re1.test( str ));		// true
    console.log(re1.lastIndex);			// 0 -- not updated

re1.lastIndex = 4;
console.log(re1.test( str ));		// true -- ignored `lastIndex`
console.log(re1.lastIndex);			// 4 -- not updated


console.log('With Flag');


var re2 = /foo/y,		// <-- notice the `y` sticky flag
	str = "++foo++";

console.log(re2.lastIndex);			// 0
console.log(re2.test( str ));		// false -- "foo" not found at `0`
console.log(re2.lastIndex);			// 0

re2.lastIndex = 2;
console.log(re2.test( str ));		// true
console.log(re2.lastIndex);			// 5 -- updated to after previous match

console.log(re2.test( str ));		// false
console.log(re2.lastIndex);			// 0 -- reset after previous match failure


console.log('another example ==>')

var re = /f../y,
	str = "foo       far       fad";

console.log(str.match( re ));		// ["foo"]

re.lastIndex = 10;
console.log(str.match( re ));		// ["far"]

re.lastIndex = 20;
console.log(str.match( re ));		// ["fad"]


console.log('Sticky VS Global')

var re = /o+./g,		// <-- look, `g`!
	str = "foot book more";

console.log(re.exec( str ));			// ["oot"]
console.log(re.lastIndex);			// 4

console.log(re.exec( str ));			// ["ook"]
console.log(re.lastIndex);			// 9

console.log(re.exec( str ));			// ["or"]
console.log(re.lastIndex);			// 13

console.log(re.exec( str ));			// null -- no more matches!
console.log(re.lastIndex);			// 0 -- starts over now!


console.log('Global using match');
var re = /o+./g,		// <-- look, `g`!
	str = "foot book more";

console.log(str.match( re ));		// ["oot","ook","or"]
