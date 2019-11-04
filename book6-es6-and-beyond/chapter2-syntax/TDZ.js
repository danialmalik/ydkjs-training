{
	// `a` is not declared
	if (typeof a === "undefined") {
		console.log( "cool" );
	}
	// `b` is declared, but in its TDZ
	if (typeof b === "undefined") {
		console.log('not-cool')
	}

	// ..
	let b;
}
