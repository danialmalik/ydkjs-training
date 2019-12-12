console.log('====================================');
console.log('Proxies');
console.log('====================================');


var obj = { a: 1 },
    handlers = {
        get(target, key, context) {
            // note: target === obj,
            // context === pobj
            console.log("accessing: ", key);
            return Reflect.get(
                target, key, context
            );
        }
    },
    pobj = new Proxy(obj, handlers);

console.log(obj.a);
// 1

console.log(pobj.a);
// accessing: a
// 1

/*
LIST OF AVAILABLE TRAPS

get(..): via [[Get]], a property is accessed on the proxy (Reflect.get(..), . property operator, or [ .. ] property operator)

set(..): via [[Set]], a property value is set on the proxy (Reflect.set(..), the = assignment operator, or destructuring assignment if it targets an object property)

deleteProperty(..): via [[Delete]], a property is deleted from the proxy (Reflect.deleteProperty(..) or delete)

apply(..) (if target is a function): via [[Call]], the proxy is invoked as a normal function/method (Reflect.apply(..), call(..), apply(..), or the (..) call operator)

construct(..) (if target is a constructor function): via [[Construct]], the proxy is invoked as a constructor function (Reflect.construct(..) or new)

getOwnPropertyDescriptor(..): via [[GetOwnProperty]], a property descriptor is retrieved from the proxy (Object.getOwnPropertyDescriptor(..) or Reflect.getOwnPropertyDescriptor(..))

defineProperty(..): via [[DefineOwnProperty]], a property descriptor is set on the proxy (Object.defineProperty(..) or Reflect.defineProperty(..))

getPrototypeOf(..): via [[GetPrototypeOf]], the [[Prototype]] of the proxy is retrieved (Object.getPrototypeOf(..), Reflect.getPrototypeOf(..), __proto__, Object#isPrototypeOf(..), or instanceof)

setPrototypeOf(..): via [[SetPrototypeOf]], the [[Prototype]] of the proxy is set (Object.setPrototypeOf(..), Reflect.setPrototypeOf(..), or __proto__)

preventExtensions(..): via [[PreventExtensions]], the proxy is made non-extensible (Object.preventExtensions(..) or Reflect.preventExtensions(..))

isExtensible(..): via [[IsExtensible]], the extensibility of the proxy is probed (Object.isExtensible(..) or Reflect.isExtensible(..))

ownKeys(..): via [[OwnPropertyKeys]], the set of owned properties and/or owned symbol properties of the proxy is retrieved (Object.keys(..), Object.getOwnPropertyNames(..), Object.getOwnSymbolProperties(..), Reflect.ownKeys(..), or JSON.stringify(..))

enumerate(..): via [[Enumerate]], an iterator is requested for the proxy's enumerable owned and "inherited" properties (Reflect.enumerate(..) or for..in)

has(..): via [[HasProperty]], the proxy is probed to see if it has an owned or "inherited" property (Reflect.has(..), Object#hasOwnProperty(..), or "prop" in obj)
*/
console.log('some traps are called as a result of another call')
{
    var handlers = {
        getOwnPropertyDescriptor(target, prop) {
            console.log(
                "getOwnPropertyDescriptor"
            );
            return Object.getOwnPropertyDescriptor(
                target, prop
            );
        },
        defineProperty(target, prop, desc) {
            console.log("defineProperty");
            return Object.defineProperty(
                target, prop, desc
            );
        }
    },
        proxy = new Proxy({}, handlers);

    proxy.a = 2; // these two traps are called as a result of set call.
    // getOwnPropertyDescriptor
    // defineProperty
}
