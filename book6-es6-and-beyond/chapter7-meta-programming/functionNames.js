console.log('====================================');
console.log('Function names');
console.log('====================================');

function foo() {

}

function printFuncName(fn) {
	console.log(fn.name)
}


// Lexical binding of function names
printFuncName(foo)
printFuncName(function abc() { })
printFuncName(function () { })

console.log('====================================');
console.log('Inferences');
console.log('====================================');
// ES6
// Get value of the variable name if function has no name
const abc = function () { }
const def = function xyz() { }
printFuncName(abc)
printFuncName(def)

/**
 * More examples of inferences
(function(){ .. });					// name:
(function*(){ .. });				// name:
window.foo = function(){ .. };		// name:

class Awesome {
	constructor() { .. }			// name: Awesome
	funny() { .. }					// name: funny
}

var c = class Awesome { .. };		// name: Awesome

var o = {
	foo() { .. },					// name: foo
	*bar() { .. },					// name: bar
	baz: () => { .. },				// name: baz
	bam: function(){ .. },			// name: bam
	get qux() { .. },				// name: get qux
	set fuz() { .. },				// name: set fuz
	["b" + "iz"]:
		function(){ .. },			// name: biz
	[Symbol( "buz" )]:
		function(){ .. }			// name: [buz]
};

var x = o.foo.bind( o );			// name: bound foo
(function(){ .. }).bind( o );		// name: bound

export default function() { .. }	// name: default

var y = new Function();				// name: anonymous
var GeneratorFunction =
	function*(){}.__proto__.constructor;
var z = new GeneratorFunction();	// name: anonymous
*/
