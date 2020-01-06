const fetch = require('node-fetch')

console.log('Caveat: Cannot cancel a promise')
{
    async function request(url) {
        // var resp = await (
        //     new Promise( function(resolve,reject){
        //         var xhr = new XMLHttpRequest();
        //         xhr.open( "GET", url );
        //         xhr.onreadystatechange = function(){
        //             if (xhr.readyState == 4) {
        //                 if (xhr.status == 200) {
        //                     resolve( xhr );
        //                 }
        //                 else {
        //                     reject( xhr.statusText );
        //                 }
        //             }
        //         };
        //         xhr.send();
        //     } )
        // );
        var resp = await fetch(url)
        resp = await resp.json()

        return resp;
    }

    var pr = request( "http://dummy.restapiexample.com/api/v1/employees" );

    pr.then(
        function fulfilled(responseText){
            console.log('responseText', responseText)
        },
        function rejected(reason){
            console.log('reason', reason)
        }
    );
}
