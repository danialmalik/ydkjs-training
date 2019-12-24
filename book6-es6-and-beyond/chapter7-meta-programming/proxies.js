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


console.log('====================================');
console.log('Proxy Limitations');
console.log('====================================');

console.log('Some operations are not (yet) handled by the proxxies yet')
var obj = { a: 1, b: 2 },
    handlers = {
        //..
    },
    pobj = new Proxy(obj, handlers);

typeof obj;
String(obj);
obj + "";
obj == pobj;
obj === pobj



console.log('====================================');
console.log('Revocable Proxies');
console.log('====================================');
{
    var obj = { a: 1 },
        handlers = {
            get(target, key, context) {
                // note: target === obj,
                // context === pobj
                console.log("accessing: ", key);
                return target[key];
            }
        },
        { proxy: pobj, revoke: prevoke } =
            Proxy.revocable(obj, handlers);

    pobj.a;
    // accessing: a
    // 1

    // later:
    prevoke();
    try {
        pobj.a;
        // TypeError
    } catch (ex) {
        console.error(ex)
    }
}



console.log('=========================')
console.log('Using Proxies')
console.log('=========================')
console.log('Proxy First, Proxy Last ======>')
{
    var messages = [],
        handlers = {
            get(target, key) {
                // string value?
                if (typeof target[key] == "string") {
                    // filter out punctuation
                    return target[key]
                        .replace(/[^\w]/g, "");
                }

                // pass everything else through
                return target[key];
            },
            set(target, key, val) {
                // only set unique strings, lowercased
                if (typeof val == "string") {
                    val = val.toLowerCase();
                    if (target.indexOf(val) == -1) {
                        target.push(val);
                    }
                }
                return true;
            }
        },
        messages_proxy =
            new Proxy(messages, handlers);

    // elsewhere:
    messages_proxy.push(
        "heLLo...", 42, "wOrlD!!", "WoRld!!"
    );

    messages_proxy.forEach(function (val) {
        console.log(val);
    });
    // hello world

    messages.forEach(function (val) {
        console.log(val);
    });
    // hello... world!!
}

console.log('Object First, Proxy Last ======>>>')

{
    var handlers = {
        get(target, key, context) {
            return function () {
                context.speak(key + "!");
            };
        }
    },
        catchall = new Proxy({}, handlers),
        greeter = {
            speak(who = "someone") {
                console.log("hello", who);
            }
        };

    // setup `greeter` to fall back to `catchall`
    Object.setPrototypeOf(greeter, catchall);

    greeter.speak();				// hello someone
    greeter.speak("world");		// hello world

    greeter.everyone();				// hello everyone!
    console.log(greeter.asdsad)
    greeter.asdsad()
    greeter.abc = '1123'
    console.log(greeter.abc)        //1123
}


console.log('=========No Such Property/Method=======');
{
    var obj = {
        a: 1,
        foo() {
            console.log("a:", this.a);
        }
    },
        handlers = {
            get(target, key, context) {
                if (Reflect.has(target, key)) {
                    return Reflect.get(
                        target, key, context
                    );
                }
                else {
                    throw "No such property/method!";
                }
            },
            set(target, key, val, context) {
                if (Reflect.has(target, key)) {
                    return Reflect.set(
                        target, key, val, context
                    );
                }
                else {
                    throw "No such property/method!";
                }
            }
        },
        pobj = new Proxy(obj, handlers);

    pobj.a = 3;
    pobj.foo();			// a: 3
    try {

        pobj.b = 4;			// Error: No such property/method!
        pobj.bar();			// Error: No such property/method!
    } catch (ex) {
        console.error(ex);
    }
}

console.log('===>using Proxy Last design')
{
    var handlers = {
        get() {
            throw "No such property/method!";
        },
        set() {
            throw "No such property/method!";
        }
    },
        pobj = new Proxy({}, handlers),
        obj = {
            a: 1,
            foo() {
                console.log("a:", this.a);
            }
        };

    // setup `obj` to fall back to `pobj`
    Object.setPrototypeOf(obj, pobj);

    obj.a = 3;
    obj.foo();			// a: 3

    try {
        obj.b = 4;			// Error: No such property/method!
        obj.bar();			// Error: No such property/method!
    } catch (ex) {
        console.error(ex)
    }
}

console.log('=========================')
console.log('Proxy Hacking the [[Prototype]] Chain')
console.log('=========================')

console.log('FACE CIRCULAR PROTOTYPE LINK');
{
    var handlers = {
        get(target, key, context) {
            if (Reflect.has(target, key)) {
                return Reflect.get(
                    target, key, context
                );
            }
            // fake circular `[[Prototype]]`
            else {
                return Reflect.get(
                    target[
                    Symbol.for("[[Prototype]]")
                    ],
                    key,
                    context
                );
            }
        }
    },
        obj1 = new Proxy(
            {
                name: "obj-1",
                foo() {
                    console.log("foo:", this.name);
                }
            },
            handlers
        ),
        obj2 = Object.assign(
            Object.create(obj1),
            {
                name: "obj-2",
                bar() {
                    console.log("bar:", this.name);
                    this.foo();
                }
            }
        );

    // fake circular `[[Prototype]]` link
    obj1[Symbol.for("[[Prototype]]")] = obj2;

    obj1.bar();
    // bar: obj-1 <-- through proxy faking [[Prototype]]
    // foo: obj-1 <-- `this` context still preserved

    obj2.foo();
    // foo: obj-2 <-- through [[Prototype]]
}

console.log('FACE Multiple PROTOTYPE LINK');
{
    var obj1 = {
        name: "obj-1",
        foo() {
            console.log("obj1.foo:", this.name);
        },
    },
        obj2 = {
            name: "obj-2",
            foo() {
                console.log("obj2.foo:", this.name);
            },
            bar() {
                console.log("obj2.bar:", this.name);
            }
        },
        handlers = {
            get(target, key, context) {
                if (Reflect.has(target, key)) {
                    return Reflect.get(
                        target, key, context
                    );
                }
                // fake multiple `[[Prototype]]`
                else {
                    for (var P of target[
                        Symbol.for("[[Prototype]]")
                    ]) {
                        if (Reflect.has(P, key)) {
                            return Reflect.get(
                                P, key, context
                            );
                        }
                    }
                }
            }
        },
        obj3 = new Proxy(
            {
                name: "obj-3",
                baz() {
                    this.foo();
                    this.bar();
                }
            },
            handlers
        );

    // fake multiple `[[Prototype]]` links
    obj3[Symbol.for("[[Prototype]]")] = [
        obj1, obj2
    ];

    obj3.baz();
    // obj1.foo: obj-3
    // obj2.bar: obj-3
}
