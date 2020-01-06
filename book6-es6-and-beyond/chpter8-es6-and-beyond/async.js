
console.log('=========================')
console.log('Async(s)')
console.log('=========================')
{
    async function main() {
        var ret = await step1();

        try {
            ret = await step2( ret );
        }
        catch (err) {
            ret = await step2Failed( err );
        }

        ret = await Promise.all( [
            step3a( ret ),
            step3b( ret ),
            step3c( ret )
        ] );

        await step4( ret );
    }

    main()
    .then(
        function fulfilled(){
            // `main()` completed successfully
            console.log('Done')
        },
        function rejected(reason){
            // Oops, something went wrong
            console.log('Failed', reason)
        }
    );
}
