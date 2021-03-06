import to from 'await-to-js'
import { Request, Response } from 'express'

import { DEFAULT_PARTY } from 'modules/party/constants'
import { PartyDoc, PartyModel } from 'modules/party/models'
import getPartyData from 'modules/party/utils/getPartyData/index'
import { UserDoc } from 'modules/user/models'
import getUserData from 'modules/user/utils/getUserData'

const newParty = async (req: Request, res: Response) => {
	const { name, maxMembers } = req.body

	if (!name || !Number(maxMembers)) {
		return res.status(400).send({ message: 'required name and maxMembers' })
	}

	const user = getUserData(req.user as UserDoc)

	const partyRaw = new PartyModel({
		...DEFAULT_PARTY,
		name,
		maxMembers,
		owner: user,
	})

	const [error, partyPlain] = await to<PartyDoc>(Promise.resolve(partyRaw.save()))

	if (error) {
		return res.status(502).send({ message: error.message })
	}

	const party = getPartyData(partyPlain, req.user as UserDoc)

	return res.status(200).send(party)
}

export default newParty
