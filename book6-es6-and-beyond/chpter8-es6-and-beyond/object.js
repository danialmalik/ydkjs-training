
console.log('=========================')
console.log('Object.observe  DEPRECATED!!!!!')
console.log('=========================')
try{
    var obj = { a: 1, b: 2 };

    Object.observe(
        obj,
        function (changes) {
            for (var change of changes) {
                console.log(change);
            }
        },
        ["add", "update", "delete"]
    );

    obj.c = 3;
    // { name: "c", object: obj, type: "add" }

    obj.a = 42;
    // { name: "a", object: obj, type: "update", oldValue: 1 }

    delete obj.b;
    // { name: "b", object: obj, type: "delete", oldValue: 2 }
} catch(ex){
    console.log(ex.message)
}


console.log('Exponent operator')
var a = 2;

console.log(a ** 4);			// Math.pow( a, 4 ) == 16

a **= 3;		// a = Math.pow( a, 3 )
console.log(a);				// 8


console.log('=========================')
console.log('ES6 and Beyond')
console.log('=========================')


console.log('=========================')
console.log('Object.observe  DEPRECATED!!!!!')
console.log('=========================')
try {
    var obj = { a: 1, b: 2 };

    Object.observe(
        obj,
        function (changes) {
            for (var change of changes) {
                console.log(change);
            }
        },
        ["add", "update", "delete"]
    );

    obj.c = 3;
    // { name: "c", object: obj, type: "add" }

    obj.a = 42;
    // { name: "a", object: obj, type: "update", oldValue: 1 }

    delete obj.b;
    // { name: "b", object: obj, type: "delete", oldValue: 2 }
} catch (ex) {
    console.log(ex.message)
}


console.log('Exponent operator')
var a = 2;

console.log(a ** 4);			// Math.pow( a, 4 ) == 16

a **= 3;		// a = Math.pow( a, 3 )
console.log(a);				// 8



console.log('===Objects Properties and ...===')
{
    var o1 = { a: 1, b: 2 },
        o2 = { c: 3 },
        o3 = { ...o1, ...o2, d: 4 };

    console.log(o3.a, o3.b, o3.c, o3.d);
    // 1 2 3 4

    var o1 = { b: 2, c: 3, d: 4 };
    var { b, ...o2 } = o1;

    console.log(b, o2.c, o2.d);		// 2 3 4
}
