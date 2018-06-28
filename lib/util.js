const Web3 = require('web3')
const web3 = new Web3()
const BigNumber = require('bignumber.js')

const bigNumberToEther = (number) => {
	return web3.fromWei(number, "ether").toString().substring(0,6)
}

const balanceIsTooLow = (balance) => {
	const threshold = new BigNumber('1701971370265500')
	if ( threshold.isGreaterThan(balance) ) return true
}

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const deleteUndefinedPropsFromObject = (object) => {
	for (const prop in object) {
		if (object[prop] === undefined || object[prop] === null || object[prop] === '') {
			delete object[prop]
		}
	}
}

const truncateBadge = (badge, {urlChars=100, videoChars=50, permalinkChars=400, titleChars=100, badgeChars=400}={}) => {

	if (badge.image && badge.image.length > urlChars) badge.image = badge.image.substr(0,urlChars) + '...'
	if (badge.banner && badge.banner.length > urlChars) badge.banner = badge.banner.substr(0,urlChars) + '...'
	if (badge.permalink && badge.permalink.length > permalinkChars) badge.permalink = badge.permalink.substr(0,permalinkChars) + '...'
	if (badge.title && badge.title.length > titleChars) badge.title = badge.title.substr(0,titleChars) + '...'
	if (badge.content && badge.content.length > badgeChars) badge.content = badge.content.substr(0,badgeChars) + '...'
	if (badge.video && badge.video.length > videoChars) badge.video = badge.video.substr(0,videoChars) + '...'
}
                               
module.exports = {truncateBadge, balanceIsTooLow, bigNumberToEther, sleep, deleteUndefinedPropsFromObject}