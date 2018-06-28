
const sortBy = (array, property, {order='ascending'}={order:'ascending'}) => {

	if (typeof array == 'object') array = Object.values(array)

	let deepCopyArray = array.slice(0)
	deepCopyArray.sort( (a,b) => a[property] - b[property])

	if (order == 'descending') deepCopyArray = deepCopyArray.reverse()

	return deepCopyArray
}

const parsePermalink = (permalink) => {

	permalink = permalink
		.split('/')
		.filter(s => s !== '')

	const parsed = {
		type: null, 
		username: null, 
		reviewUid: null, 
		replyUids: [], 
		currentReplyUid: null,
		permalinkType: null
	}

	parsed.type = permalink.shift()
	parsed.username = permalink.shift()
	parsed.reviewUid = permalink.shift()

	// handling replies
	const length = permalink.length
	for (let i=0; i<length; i++) {
		const reply = permalink.shift()
		if (!reply) break

		if (reply != 'replies') {
			if (!parsed.replyUids) parsed.replyUids = []

			parsed.replyUids.push(reply)
		}
	}

	// handling current reply
	if (parsed.replyUids && parsed.replyUids.length) {
		parsed.currentReplyUid = parsed.replyUids[parsed.replyUids.length-1]
	}

	parsed.permalinkType = (parsed.replyUids.length) ? 'reply' : 'review'

	return parsed
}

const timeout = (ms, options) => {
	let secsRemaining = ms / 1000
	if (!options || !options.silent) countdown(secsRemaining)
	return new Promise( (resolve,reject) => setTimeout( () => { resolve() }, ms))
}

const countdown = (secsRemaining) => {
	setTimeout( () => {
		process.stdout.write(secsRemaining + "s left to wait..." + "\r")
		secsRemaining-- 
		if (secsRemaining > 0) countdown(secsRemaining) 
	},1000)
}

module.exports = {sortBy, parsePermalink, timeout}