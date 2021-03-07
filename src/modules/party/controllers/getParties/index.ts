import to from 'await-to-js'
import { Request, Response } from 'express'

import { PartyDoc, PartyModel } from 'modules/party/models'
import { Page, Party } from 'modules/party/types'
import getPartyData from 'modules/party/utils/getPartyData'
import { UserDoc } from 'modules/user/models'

const PAGINATION_CONFIG = {
	size: 40,
	page: 1,
}

const getParties = async (req: Request, res: Response) => {
	const { size: _size, page: _page } = req.query

	const size = !Number(_size)
		? PAGINATION_CONFIG.size
		: Number(_size) > PAGINATION_CONFIG.size
		? PAGINATION_CONFIG.size
		: Number(_size)
	const page = Number(_page) || PAGINATION_CONFIG.page

	const totalEntities = await PartyModel.estimatedDocumentCount().exec()
	const totalPages = Math.ceil(totalEntities / size)
	const hasNextPage = totalEntities - size * (page + 1) > 0

	console.log(hasNextPage, totalEntities, size, page)

	if (size <= 0 || page <= 0 || page > totalPages) {
		return res.status(400).send({ message: 'query is invalid' })
	}

	const nextPage = hasNextPage ? page + 1 : page
	const skip = size * (page - 1)

	const [error, partyPlains] = await to(Promise.resolve(PartyModel.find().skip(skip).limit(size).lean()))

	if (error) {
		return res.status(502).send({ message: error.message })
	}

	const parties = partyPlains.map((party) => getPartyData(party as PartyDoc, req.user as UserDoc))

	const pagination: Page<Party> = {
		currentPage: page,
		nextPage,
		totalEntities,
		entities: parties,
	}

	return res.send(pagination)
}

export default getParties
