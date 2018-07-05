const {deleteUndefinedPropsFromObject, truncateBadge, balanceIsTooLow} = require('./util')
const state = require('./state')

const issueBadge = async (reputationData) => {

	// check balance
	const balance = await state.web3.eth.getBalanceAsync(account)
	if ( balanceIsTooLow(balance) ) throw Error(`balance (${balance.toString()}) is too low`)

	deleteUndefinedPropsFromObject(reputationData)
	truncateBadge(reputationData)

	let reputationString = JSON.stringify(reputationData)

	if (reputationString.length > 1000) reputationString = reputationString.substr(0,1000) + '...'

	let beneficiary = 0

	let txHash = await rozet.issueBadgeAsync(reputationData.sendersEthAddress, reputationData.recipientsEthAddress, reputationData.sendersEthAddress, reputationString)

	return txHash
}

module.exports = {issueBadge}
