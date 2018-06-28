const {deleteUndefinedPropsFromObject, truncateBadge} = require('./util')
const state = require('./state')

const issueBadge = async (reputationData) => {

	deleteUndefinedPropsFromObject(reputationData)
	truncateBadge(reputationData)

	let reputationString = JSON.stringify(reputationData)

	if (reputationString.length > 1000) reputationString = reputationString.substr(0,1000) + '...'

	let beneficiary = 0

	let txHash = await rozet.issueBadgeAsync(reputationData.sendersEthAddress, reputationData.recipientsEthAddress, reputationData.sendersEthAddress, reputationString)

	return txHash
}

module.exports = {issueBadge}
