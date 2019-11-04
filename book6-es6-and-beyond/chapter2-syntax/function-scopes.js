{
	foo();					// works!

	function foo() {
		console.log('Called');

	}
}

foo();						// ReferenceError
// But doesn't occur. No idea why
