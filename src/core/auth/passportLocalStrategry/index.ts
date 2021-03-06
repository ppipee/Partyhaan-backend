import to from 'await-to-js'
import { Strategy } from 'passport-local'

import { UserModel } from 'modules/user/models'
import { UserDoc } from 'modules/user/models/index'

import compareBcrypt from '../compareBcrypt'

const passportLocalStrategy = new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, cb) => {
		const [err, user] = await to<UserDoc>(Promise.resolve(UserModel.findOne({ email })))

		if (err) {
			return cb(err)
		}
		if (!user) {
			return cb(null, false)
		}
		if (compareBcrypt(password, user.password)) {
			return cb(null, user)
		}

		return cb(null, false)
	},
)

export default passportLocalStrategy
