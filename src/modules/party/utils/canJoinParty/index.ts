import { PartyDoc } from 'modules/party/models'
import { UserDoc } from 'modules/user/models'

export default function canJoinParty(party: PartyDoc, user?: UserDoc) {
	const isFull = party.maxMembers === party.totalMembers
	const canJoin = String(user?._id) !== String(party.owner.id) && !party.members.includes(String(user?._id)) && !isFull

	return canJoin
}
