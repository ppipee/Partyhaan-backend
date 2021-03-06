import { PartyPlain } from 'modules/party/models'
import { Party } from 'modules/party/types'
import { UserDoc } from 'modules/user/models'

import canJoinParty from '../canJoinParty'

export default function getPartyData(party: PartyPlain, user?: UserDoc): Party {
	const canJoin = canJoinParty(party, user)

	return {
		id: String(party._id),
		name: party.name,
		maxMembers: party.maxMembers,
		totalMembers: party.totalMembers,
		owner: party.owner,
		members: party.members,
		canJoin,
	}
}
