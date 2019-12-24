console.log('=========================')
console.log('Ordering')
console.log('=========================')
/*
The ordering is:

First, enumerate any owned properties that are integer indexes, in ascending numeric order.
Next, enumerate the rest of the owned string property names in creation order.
Finally, enumerate owned symbol properties in creation order.
*/

{
    var o = {};

    o[Symbol("c")] = "yay";
    o[2] = true;
    o[1] = true;
    o.b = "awesome";
    o.a = "cool";

    console.log(Reflect.ownKeys(o));				// [1,2,"b","a",Symbol(c)]
    console.log(Object.getOwnPropertyNames(o));	// [1,2,"b","a"]
    console.log(Object.getOwnPropertySymbols(o));	// [Symbol(c)]
}
