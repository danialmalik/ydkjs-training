console.log('=========================')
console.log('Array#includes')
console.log('=========================')
{
    // Older way
    var vals = ["foo", "bar", 42, "baz"];

    if (vals.indexOf(42) >= 0) {
        // found it!
        console.log('found')
    }

    // older but better way
    var vals = ["foo", "bar", 42, "baz"];

    if (~vals.indexOf(42)) {
        // found it!
        console.log('found')
    }

    // New way
    var vals = ["foo", "bar", 42, "baz"];

    if (vals.includes(42)) {
        // found it!
        console.log('found')

    }
}
