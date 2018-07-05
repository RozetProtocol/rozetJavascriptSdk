const rozet = require('rozet')

;(async () => {

	const mnemonic = "example example example example example example example example example example example example"
	await rozet.init(mnemonic)

	const badge = {
		title: "Great guy!",
		content: "Great doing business with you!",
		rating:5,
		recipient: "john_b",
		recipientsEthAddress: "0x1111111111111111111111111111111111111111",
		sender: "nathan!",
		sendersEthAddress: "0x1111111111111111111111111111111111111111",
	}

	const txHash = await rozet.issueBadge(badge)

	// do something with tx hash!
	console.log(`Badge issued with txHash ${txHash}`)

})()