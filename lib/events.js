const {init} = require('./init')
const state = require('./state')
const queue = require('queue')
const q = queue({concurrency: 1, autostart: true, timeout:1000})

const events = {
	on: async (prevBlocks, cb) => {

		await init()

		const lastestBlock = await state.web3.eth.getBlockNumberAsync()

		const fromBlock = lastestBlock - prevBlocks

		const events = state.rozet.allEvents({ fromBlock, toBlock: 'latest' })

		events.watch( (err, event) => q.push( () => new Promise( async (resolve) => {

			await cb(event)
			resolve()

		}) )) // events end
	}
}

module.exports = {events}
