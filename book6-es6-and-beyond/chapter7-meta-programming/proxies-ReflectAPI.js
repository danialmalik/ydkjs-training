/*
Same as Object's
-----------
Reflect.getOwnPropertyDescriptor(..)
Reflect.defineProperty(..)
Reflect.getPrototypeOf(..)
Reflect.setPrototypeOf(..)
Reflect.preventExtensions(..)
Reflect.isExtensible(..)


An object's keys can be accessed/inspected using these utilities:

Reflect.ownKeys(..):
 Returns the list of all owned keys (not "inherited"), as returned by both Object.getOwnPropertyNames(..) and Object.getOwnPropertySymbols(..). See the "Property Enumeration Order" section for information about the order of keys.

Reflect.enumerate(..):
  Returns an iterator that produces the set of all non-symbol keys (owned and "inherited") that are enumerable (see the this & Object Prototypes title of this series). Essentially, this set of keys is the same as those processed by a for..in loop. See the "Property Enumeration Order" section for information about the order of keys.

Reflect.has(..):
 Essentially the same as the in operator for checking if a property is on an object or its [[Prototype]] chain. For example, Reflect.has(o,"foo") essentially performs "foo" in o.

 Function calls and constructor invocations can be performed manually, separate of the normal syntax (e.g., (..) and new) using these utilities:

Reflect.apply(..):
 For example, Reflect.apply(foo,thisObj,[42,"bar"]) calls the foo(..) function with thisObj as its this, and passes in the 42 and "bar" arguments.

Reflect.construct(..):
    For example, Reflect.construct(foo,[42,"bar"]) essentially calls new foo(42,"bar").

Object property access, setting, and deletion can be performed manually using these utilities:

Reflect.get(..):
 For example, Reflect.get(o,"foo") retrieves o.foo.

Reflect.set(..):
 For example, Reflect.set(o,"foo",42) essentially performs o.foo = 42.

Reflect.deleteProperty(..):
 For example, Reflect.deleteProperty(o,"foo") essentially performs delete o.foo.
*/
