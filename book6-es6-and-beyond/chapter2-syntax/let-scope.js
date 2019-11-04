console.log('====================================');
console.log('Using let');
console.log('====================================');

var funcs = [];

for (let i = 0; i < 5; i++) {
	funcs.push( function(){
		console.log( i );
	} );
}

funcs[3]();

console.log('====================================');
console.log('Using var');
console.log('====================================');

var funcs = [];

for (var i = 0; i < 5; i++) {
	funcs.push( function(){
		console.log( i );
	} );
}

funcs[3]();
