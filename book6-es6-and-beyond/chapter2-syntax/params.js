console.log('====================================');
console.log('Default value expression');
console.log('====================================');


console.log('====================================');
console.log('First example');
console.log('====================================');
function bar(val) {
    console.log("bar called!");
    return y + val;
}

function foo(x = y + 3, z = bar(x)) {
    console.log(x, z);
}

var y = 5;
foo();								// "bar called"
// 8 13
foo(10);							// "bar called"
// 10 15
y = 6;
foo(undefined, 10);


console.log('====================================');
console.log('Second example');
console.log('====================================');

var w = 1, z = 2;

try {
    function foo(x = w + 1, y = x + 1, z = z + 1) {
        //  `z=z+1` => In `z+1` `z` is found in paramters scope (itself)
        // but has not been initialized yet
        console.log(x, y, z);
    }

    foo()
} catch (ex) {
    console.error(ex)
}


console.log('====================================');
console.log('Third Example');
console.log('====================================');
function foo2(x =
    (function (v) { return v + 11; })(31)
) {
    console.log(x);
}

foo2();			// 42
