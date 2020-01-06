console.log('=========================')
console.log('SIMD')
console.log('=========================')
try {
    //Single Instruction, Multiple Data (SIMD)
    var v1 = SIMD.float32x4(3.14159, 21.0, 32.3, 55.55);
    var v2 = SIMD.float32x4(2.1, 3.2, 4.3, 5.4);

    console.log(SIMD.float32x4.mul(v1, v2));
    // [ 6.597339, 67.2, 138.89, 299.97 ]
} catch (ex) {
    console.error(ex.message)
}
