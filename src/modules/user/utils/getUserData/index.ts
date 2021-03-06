import { UserDoc } from 'modules/user/models'
import { User } from 'modules/user/types'

export default function getUserData(user: UserDoc) {
	const userData: User = {
		id: user._id,
		email: user.email,
	}

	return userData
}
