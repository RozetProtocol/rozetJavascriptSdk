const rozet = require('rozet')

;(async () => {

    await rozet.init()

    const previousBlocks = 1000000

    // run this callback for every event in the previous blocks
    rozet.events.on( previousBlocks, async (event) => {

        // badge info
        const {sender} = event.args
        const txHash = event.transactionHash

        // do something!!!
        console.log(`${sender} sent a badge with txHash ${txHash}!`)

    })

})()