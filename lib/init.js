// modules
const Web3 = require('web3')
const Promise = require('bluebird')

// abis
const RozetTokenABI = require('./abis/RozetTokenABI.json')
const RozetABI = require("./abis/RozetABI.json")

// files
const HDWalletProvider = require('truffle-hdwallet-provider')
const {bigNumberToEther} = require('./util')
const state = require('./state')

const init = async (mnemonic="") => {

	// Rinkeby settings:
	const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/uaNKEkpjsyvArG0sHifx ") // Rinkeby
	const rozetTokenContractAddress = 0xcea271df25a47087252da2fe9b7d6d9152f0c98a
	const rozetContractAddress = "0xb93ca7fda4422ce8a70daa7058a603bd613033a9"

	// Mainnet settings:
	// const provider = new HDWalletProvider(mnemonic, "https://mainnet.infura.io/uaNKEkpjsyvArG0sHifx", 0, totalAccounts) // Mainnet
	// const rozetTokenContractAddress = "not on mainnet yet"
	// const rozetContractAddress = "not on mainnet yet"

	web3 = new Web3(provider)
	Promise.promisifyAll(web3.eth)

	// rozet token contract
	const RozetToken = web3.eth.contract(RozetTokenABI)
	rozetToken = RozetToken.at(rozetTokenContractAddress)
	Promise.promisifyAll(rozetToken)

	// rozet contract
	const Rozet = web3.eth.contract(RozetABI)
	rozet = Rozet.at(rozetContractAddress)
	Promise.promisifyAll(rozet)

	// account
	let accounts = await web3.eth.getAccountsAsync()
	account = accounts[0]

	// Default account is required for web3 to work.
	web3.eth.defaultAccount = account

	state.web3 = web3
	state.rozetToken = rozetToken
	state.rozet = rozet
	state.account = account

}

module.exports = {init}
