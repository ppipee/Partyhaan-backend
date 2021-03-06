import to from 'await-to-js'
import { Request, Response } from 'express'

import { PartyDoc, PartyModel } from 'modules/party/models'
import canJoinParty from 'modules/party/utils/canJoinParty'
import getPartyData from 'modules/party/utils/getPartyData'
import { UserDoc } from 'modules/user/models'

const joinParty = async (req: Request, res: Response) => {
	const { partyId } = req.params
	const user = req.user as UserDoc

	if (!partyId) {
		return res.status(400).send({ message: 'required partyId' })
	}

	const [getError, prevPartyPlain] = await to(
		Promise.resolve(PartyModel.findById(partyId, {}, { returnOriginal: false }).lean()),
	)

	if (!prevPartyPlain) {
		return res.status(404).send({ message: 'not found party' })
	}

	if (getError) {
		return res.status(500).send({ message: getError })
	}

	const canJoin = canJoinParty(prevPartyPlain as PartyDoc, user)

	if (!canJoin) {
		return res.status(400).send({ message: 'can not join party' })
	}

	if (prevPartyPlain.totalMembers === prevPartyPlain.maxMembers) {
		return res.status(400).send({ message: 'party have full members' })
	}

	const [updateError, partyPlain] = await to(
		Promise.resolve(
			PartyModel.findByIdAndUpdate(partyId, {
				$inc: { totalMembers: 1 },
				$max: { totalMembers: prevPartyPlain.maxMembers },
				$push: { members: String(user._id) },
			}),
		),
	)

	if (updateError) {
		return res.status(500).send({ message: updateError })
	}

	const party = getPartyData(partyPlain, user)

	return res.send(party)
}

export default joinParty
