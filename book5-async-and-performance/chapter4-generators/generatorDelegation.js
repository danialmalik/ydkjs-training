
function run(gen) {
	var args = [].slice.call( arguments, 1), it;

	// initialize the generator in the current context
	it = gen.apply( this, args );

	// return a promise for the generator completing
	return Promise.resolve()
		.then( function handleNext(value){
			// run to the next yielded value
			var next = it.next( value );

			return (function handleResult(next){
				// generator has completed running?
				if (next.done) {
					return next.value;
				}
				// otherwise keep going
				else {
					return Promise.resolve( next.value )
						.then(
							// resume the async loop on
							// success, sending the resolved
							// value back into the generator
							handleNext,

							// if `value` is a rejected
							// promise, propagate error back
							// into the generator for its own
							// error handling
							function handleErr(err) {
								return Promise.resolve(
									it.throw( err )
								)
								.then( handleResult );
							}
						);
				}
			})(next);
		} );
}

function foo(x,y) {
	return Promise.resolve(`Success: value 1: ${x*y}`)
}
function foo2(x,y) {
	return Promise.resolve(`Success: value 2: ${x + y}`)
}

function *inner(x,y){
    let text = yield foo( x, y );
    let text2 = yield foo2( x, y );
    return `${text} joins ${text2}`
}


function *main() {
	try {
		const result = yield *inner(10, 100)
		console.log( `RESULT: ${result}` );
	}
	catch (err) {
		// or you can throw error to be caught and handled outside
		console.error('ERROR HERE : ', err );
	}
}


run( main );
