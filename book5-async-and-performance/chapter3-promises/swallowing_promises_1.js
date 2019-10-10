console.log('====================================');
console.log('Swallowing promises: Exception in promise');
console.log('====================================');
var p1 = new Promise(function (resolve, reject) {
    console.log('inside promise 1');
    foo.bar();	// `foo` is not defined, so error!
    resolve(42);	// never gets here :(
});

const test = async () => {
    p1.then(
        function fulfilled() {
            console.log('promise 1 resolved');
            // never gets here :(
        },
        function rejected(err) {
            console.log('promise 1 rejected : ', err);
            // `err` will be a `TypeError` exception object
            // from the `foo.bar()` line.
        }
    );
}
