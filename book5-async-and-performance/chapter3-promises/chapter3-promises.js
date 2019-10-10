// console.log('====================================');
// console.log('Swallowing promises: Exception in promise');
// console.log('====================================');
// var p1 = new Promise(function (resolve, reject) {
//     console.log('inside promise 1');
//     foo.bar();	// `foo` is not defined, so error!
//     resolve(42);	// never gets here :(
// });

// const test = async () => {
//     p1.then(
//         function fulfilled() {
//             console.log('promise 1 resolved');
//             // never gets here :(
//         },
//         function rejected(err) {
//             console.log('promise 1 rejected : ', err);
//             // `err` will be a `TypeError` exception object
//             // from the `foo.bar()` line.
//         }
//     );
// }


// console.log('====================================');
// console.log('Swallowing promises: Exception in promise resolution');
// console.log('====================================');
// var p2 = new Promise(function (resolve, reject) {
//     console.log('inside promise 2');
//     resolve(42);
// });
// const test2 = async () => {
//     await p1;
//     p2.then(
//         function fulfilled(msg) {
//             console.log('promise 2 resolved');
//             foo.bar();
//             console.log('promise 2: foo called');	// never gets here :(
//         },
//         function rejected(err) {
//             console.log('promise 2 rejected');
//             // never gets here either :(
//         }
//     );

// }
var p = {
	then: function(cb) {
		cb( 42 );
	}
};

// this works OK, but only by good fortune
p
.then(
	function fulfilled(val){
		console.log( val ); // 42
	},
	function rejected(err){
		// never gets here
	}
);
