const assert = require('assert')
const {sortBy, parsePermalink} = require('./index')

describe('global util', () => {

	it('sortBy should sort by property', async () => {

		let array = [{a:99904}, {a:57}, {a:965}]

		array = sortBy(array, 'a')

		assert.deepEqual(array, [{a:57}, {a:965}, {a:99904}])

		array = sortBy(array, 'a', {order:'descending'})

		assert.deepEqual(array, [{a:99904}, {a:965}, {a:57}])

	})	

	it('parsePermalink should parse permalinks', async () => {

		let parsedPermalink = parsePermalink('/bookReviews/A Tale of Two Cities by Charles Dickens (414)/0b545a02c99fcd481e65551e79943f/')

		assert.deepEqual(
			parsedPermalink, 
			{
				type: 'bookReviews', 
				username: 'A Tale of Two Cities by Charles Dickens (414)', 
				reviewUid: '0b545a02c99fcd481e65551e79943f',
				replyUids: [], 
				currentReplyUid: null,
				permalinkType: 'review'
			})


		parsedPermalink = parsePermalink('/amazonReviews/B0721SS1B3/8101b4f49c2a227f9e9c4197fe1f52/replies/03057d3481f1060b1993a5a1f0f615/')

		assert.deepEqual(
			parsedPermalink, 
			{
				type: 'amazonReviews', 
				username: 'B0721SS1B3', 
				reviewUid: '8101b4f49c2a227f9e9c4197fe1f52', 
				replyUids: ['03057d3481f1060b1993a5a1f0f615'], 
				currentReplyUid: '03057d3481f1060b1993a5a1f0f615',
				permalinkType: 'reply'
			}
		)

		parsedPermalink = parsePermalink('/amazonReviews/B0721SS1B3/8101b4f49c2a227f9e9c4197fe1f52/replies/123456/replies/123456/replies/123456/replies/123456/replies/03057d3481f1060b1993a5a1f0f615/')

		assert.deepEqual(
			parsedPermalink, 
			{
				type: 'amazonReviews', 
				username: 'B0721SS1B3', 
				reviewUid: '8101b4f49c2a227f9e9c4197fe1f52', 
				replyUids: ['123456', '123456', '123456', '123456', '03057d3481f1060b1993a5a1f0f615'], 
				currentReplyUid: '03057d3481f1060b1993a5a1f0f615',
				permalinkType: 'reply'
			}
		)

	})

})

