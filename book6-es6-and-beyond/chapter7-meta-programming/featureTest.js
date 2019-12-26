console.log('=========================')
console.log('Feature testing')
console.log('=========================')

console.log('Syntax testing')

console.log("What won't work");

try {
    // This wont work as if a certain syntax is not supported,
    // the engine will choke at compile time and code won't even
    // run
	a = () => {};
	ARROW_FUNCS_ENABLED = true;
}
catch (err) {
	ARROW_FUNCS_ENABLED = false;
}

console.log("What could work");

try {
	new Function( "( () => {} )" );
	ARROW_FUNCS_ENABLED = true;
}
catch (err) {
	ARROW_FUNCS_ENABLED = false;
}
