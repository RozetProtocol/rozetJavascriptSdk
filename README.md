# Rozet Javascript SDK

The Rozet JavaScript SDK implements the client-side libraries used by
applications using the Rozet protocols. This SDK is distributed via:

- CDN (`<script src="https://app.rozet.io/rozetNodeSdk/0.2.1/rozet.js"></script>`)
- [npm package](https://www.npmjs.com/package/rozet)

## Getting Started

### Installation

To use Rozet in your project, run:

```bash
npm install rozet
```

### Usage

Before you can start working on the Rozet JS SDK, you need to have Node.js
`8.0.0` or greater installed on your machine. 

To download Node.js visit https://nodejs.org/en/download/.

_NOTE: You can use a tool like [`NVM`](https://github.com/creationix/nvm)
or [`N`](https://github.com/tj/n) to install and manage multiple node versions_

**Example** - Issue a badge:

Save file as **issueBadge.js**

```js
const rozet = require('rozet')

;(async () => {

	// replace with your own
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
```

Execute script on the command line

```bash
node issueBadge.js
```

**Example** - Listen for new badges:

Save file as **listenForBadges.js**

```js
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
```

Execute script on the command line

```bash
node listenForBadges.js
```

## Licence 
You can view our [licence here](https://github.com/RozetProtocol/rozetNodeSdk/blob/master/LICENSE).
