"use strict";
// Proper Tail Calls (PTC)
console.log('=========================')
console.log('Tail Call Rewrite')
console.log('=========================')

{
    function foo(x) {
        if (x <= 1) return 1;
        return (x / 2) + foo(x - 1);
    }

    try {
        foo(123456);			// RangeError
    } catch (ex) {
        console.log(ex.message)
    }

}
//  converting it to TCO
// In a tco engine it will work. otherwise still error
{

    var foo = (function () {
        function _foo(acc, x) {
            if (x <= 1) return acc;
            return _foo((x / 2) + acc, x - 1);
        }

        return function (x) {
            return _foo(1, x);
        };
    })();
    try {
        foo(123456);			// 3810376848.5
    } catch (ex) {
        console.log(ex.message)
    }
}

console.log('=========================')
console.log('Non-TCO Optimizations')
console.log('=========================')

// This reworking required minimal changes to factor out the recursion into the loop in trampoline(..):

// First, we wrapped the return _foo .. line in the return partial() { .. function expression.
// Then we wrapped the _foo(1,x) call in the trampoline(..) call.

// The reason this technique doesn't suffer the call stack limitation is that each of those inner partial(..) functions is
// just returned back to the while loop in trampoline(..), which runs it and then loop iterates again. In other words,
// partial(..) doesn't recursively call itself, it just returns another function. The stack depth remains constant, so it
// can run as long as it needs to.

console.log('trampolining-->')
{
    function trampoline(res) {
        while (typeof res == "function") {
            res = res();
        }
        return res;
    }

    var foo = (function () {
        function _foo(acc, x) {
            if (x <= 1) return acc;
            return function partial() {
                return _foo((x / 2) + acc, x - 1);
            };
        }

        return function (x) {
            return trampoline(_foo(1, x));
        };
    })();

    console.log(foo(123456));			// 3810376848.5
}


console.log('=========================')
console.log('Feature testing: TCO enabled?')
console.log('=========================')

{
    let TCO_ENABLED;
    try {
        (function foo(x){
            if (x < 5E5) return foo( x + 1 );
        })( 1 );

        TCO_ENABLED = true;
    }
    catch (err) {
        TCO_ENABLED = false;
    }

    console.log(TCO_ENABLED)
}
