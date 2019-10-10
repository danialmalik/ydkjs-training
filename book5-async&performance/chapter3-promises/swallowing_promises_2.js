
console.log('====================================');
console.log('Swallowing promises: Exception in promise resolution');
console.log('====================================');
var p2 = new Promise(function (resolve, reject) {
    console.log('inside promise 2');
    resolve(42);
});
const test2 = async () => {
    await p1;
    p2.then(
        function fulfilled(msg) {
            console.log('promise 2 resolved');
            foo.bar();
            console.log('promise 2: foo called');	// never gets here :(
        },
        function rejected(err) {
            console.log('promise 2 rejected');
            // never gets here either :(
        }
    );

}
