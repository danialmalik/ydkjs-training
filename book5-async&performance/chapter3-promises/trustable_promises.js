
console.log('====================================');
console.log('Trustable promises');
console.log('====================================');
// promise with no "thenable" value passed to resolve.
console.log('Promise with no promise "thenable" in resolve nmethod');

var p1 = Promise.resolve( 42 );

var p2 = Promise.resolve( p1 );

console.log(p1 === p2); // true

console.log('Promise with non promise but "thenable" object');

var p = {
	then: function(cb) {
		cb( 42 );
	}
};

// this works OK, but only by good fortune
p
.then(
	function fulfilled(val){
		console.log( val ); // 42
	},
	function rejected(err){
		// never gets here
	}
);
