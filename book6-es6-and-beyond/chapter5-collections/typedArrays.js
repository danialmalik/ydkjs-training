console.log('====================================');
console.log('Array Buffer');
console.log('====================================');

var buf = new ArrayBuffer(32); // 32 bytes
console.log(buf.byteLength);							// 32

console.log('Add "View" layer');
var arr = new Uint16Array(buf);
console.log(arr.length); // 16 bytes view


console.log('====================================');
console.log('TEST : little or big endianess');
console.log('====================================');

var littleEndian = (function () {
    var buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
})();

console.log(littleEndian);


console.log('====================================');
console.log('Multiple views');
console.log('====================================');
var buf = new ArrayBuffer(2);

var view8 = new Uint8Array(buf);
var view16 = new Uint16Array(buf);

view16[0] = 3085;
console.log(view8[0]);						// 13
console.log(view8[1]);						// 12

console.log(view8[0].toString(16));		// "d"
console.log(view8[1].toString(16));		// "c"

// swap (as if endian!)
var tmp = view8[0];
view8[0] = view8[1];
view8[1] = tmp;

console.log(view16[0]);						// 3340

console.log('>>>Using constructor')
var buf = new ArrayBuffer(32);
var first = new Uint16Array(buf, 0, 2)[0], // Multiple views in same buffer
    second = new Uint8Array(buf, 2, 1)[0],
    third = new Uint8Array(buf, 3, 1)[0],
    fourth = new Float32Array(buf, 4, 4)[0];

console.log(first, second, third, fourth)



console.log('====================================');
console.log('Types arrays constructors');
console.log('====================================');

// Be aware that the elements in TypedArrays really are constrained to the declared bit sizes. If you have a Uint8Array and try to assign something larger than an 8-bit value into one of its elements, the value wraps around so as to stay within the bit length.
var a = new Uint8Array(3);
a[0] = 10;
a[1] = 20;
a[2] = 30;

var b = a.map(function (v) {
    return v * v;
});

console.log(b);				// [100, 144, 132]
// 20*20 is larger than 8 bitess

// To get around such a limitation, you can use the TypedArray#from(..) function:

var a = new Uint8Array(3);
a[0] = 10;
a[1] = 20;
a[2] = 30;

var b = Uint16Array.from(a, function (v) {
    return v * v;
});

console.log(b);				// [100, 400, 900]


console.log('SORTING');

var a = [ 10, 1, 2, ];
console.log(a.sort());								// [1,10,2]

var b = new Uint8Array( [ 10, 1, 2 ] );
console.log(b.sort());								// [1,2,10]
