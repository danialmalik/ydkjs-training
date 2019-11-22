console.log('====================================');
console.log('SUPER');
console.log('====================================');

class ParentA {
    constructor() { this.id = "a"; }
    foo() { console.log("ParentA:", this.id); }
}

class ParentB {
    constructor() { this.id = "b"; }
    foo() { console.log("ParentB:", this.id); }
}

class ChildA extends ParentA {
    foo() {
        super.foo();
        console.log("ChildA:", this.id);
    }
}

class ChildB extends ParentB {
    foo() {
        super.foo();
        console.log("ChildB:", this.id);
    }
}

var a = new ChildA();
a.foo();					// ParentA: a
// ChildA: a
var b = new ChildB();		// ParentB: b
b.foo();					// ChildB: b


// borrow `b.foo()` to use in `a` context
// Here "this" is changed to "B" in foo call but in above calls (super) "this" is not changed
b.foo.call(a);


console.log('====================================');
console.log('Inheritance');
console.log('====================================');
class Foo {
    constructor() { this.a = 1; }
}

class Bar extends Foo {
    constructor() {
        this.b = 2;			// not allowed before `super()`
        super();			// to fix swap these two statements
    }
}

try {
    var b = new Bar()
} catch (ex) {
    console.log(ex)
}


console.log('====================================');
console.log('Extending natives: Array');
console.log('====================================');
class MyCoolArray extends Array {
    first() { return this[0]; }
    last() { return this[this.length - 1]; }
}

var a = new MyCoolArray(1, 2, 3);

console.log(a.length);					// 3
console.log(a);							// [1,2,3]

console.log(a.first());					// 1
console.log(a.last());					// 3


console.log('====================================');
console.log('Extending natives: Custom error classes');
console.log('====================================');

class Oops extends Error {
    constructor(reason) {
        super(reason);
        this.oops = reason;
    }
}

// later:
var ouch = new Oops("I messed up!");
try {
    throw ouch;
} catch (ex) {
    console.error(ex)
}


console.log('====================================');
console.log('new target');
console.log('====================================');
{
    class Foo {
        constructor() {
            console.log("Foo: ", new.target.name);
        }
    }

    class Bar extends Foo {
        constructor() {
            super();
            console.log("Bar: ", new.target.name);
        }
        baz() {
            console.log("baz: ", new.target);
        }
    }

    var a = new Foo();
    // Foo: Foo

    var b = new Bar();
    // Foo: Bar   <-- respects the `new` call-site
    // Bar: Bar

    b.baz();
    // baz: undefined
}

console.log('====================================');
console.log('Static');
console.log('====================================');
{
    class Foo {
        static cool() { console.log("inside Foo static cool: cool"); }
        wow() { console.log("Inside Foo wow: wow"); }
    }

    class Bar extends Foo {
        static awesome() {
            super.cool();
            console.log("inside Bar awesome: awesome");
        }
        neat() {
            super.wow();
            console.log("inside Bar neat: neat");
        }
    }

    Foo.cool();					// "cool"
    Bar.cool();					// "cool"
    Bar.awesome();				// "cool"
    // "awesome"

    var b = new Bar();
    b.neat();					// "wow"
    // "neat"

    console.log(b.awesome);					// undefined
    console.log(b.cool);						// undefined
}



console.log('====================================');
console.log('Symbol.species Constructor Getter');
console.log('====================================');

{
    class MyCoolArray extends Array {
        // force `species` to be parent constructor
        // 'species' are instances created in result of some method of this class
        static get [Symbol.species]() { return Array; }
    }

    var a = new MyCoolArray(1, 2, 3),
        b = a.map(function (v) { return v * 2; });

    console.log(a instanceof MyCoolArray);	// false
    console.log(a instanceof Array);			// true

    console.log(b instanceof MyCoolArray);	// false
    console.log(b instanceof Array);			// true
}

console.log('====================================');
console.log('Using child species');
console.log('====================================');
{
    class Foo {
        // defer `species` to derived constructor
        static get [Symbol.species]() { return this; }
        spawn() {
            return new this.constructor[Symbol.species]();
        }
    }

    class Bar extends Foo {
        // force `species` to be parent constructor
        static get [Symbol.species]() { return Foo; }
    }

    var a = new Foo();
    var b = a.spawn();
    console.log(b instanceof Foo);					// true

    var x = new Bar();
    var y = x.spawn();
    console.log(y instanceof Bar);					// false
    console.log(y instanceof Foo);					// true
}
