function foo(x,y) {
	return Promise.resolve(`Success: value: ${x*y}`)
}

function *main() {
	try {
		var text = yield foo( 11, 31 );
		console.log( text );
	}
	catch (err) {
		// or you can throw error to be caught and handled outside
		console.error('ERROR HERE : ', err );
	}
}


var it = main()
var p = it.next().value

p.then(
	val => console.log('resolution caught: ',val),
	err => console.error('error caught: ',err),
)
