import to from 'await-to-js'
import { Request, Response } from 'express'

import { PartyDoc, PartyModel } from 'modules/party/models'
import getPartyData from 'modules/party/utils/getPartyData'
import { UserDoc } from 'modules/user/models'

const getParties = async (req: Request, res: Response) => {
	const [error, partyPlains] = await to(Promise.resolve(PartyModel.find().lean()))

	if (error) {
		return res.status(502).send({ message: error.message })
	}

	const parties = partyPlains.map((party) => getPartyData(party as PartyDoc, req.user as UserDoc))

	return res.send({ parties })
}

export default getParties
