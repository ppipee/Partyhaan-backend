import jwt from 'jsonwebtoken'

import { UserDoc } from 'modules/user/models'

import getUserData from '../getUserData'

export default function getUserWithToken(user: UserDoc, secret: string) {
	const tokenUser = {
		id: user._id,
		email: user.email,
		password: user.password,
	}

	const token = jwt.sign(tokenUser, secret)
	const userData = getUserData(user)

	return [userData, token]
}
