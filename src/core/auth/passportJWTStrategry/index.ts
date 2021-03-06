import to from 'await-to-js'
import dotenv from 'dotenv'
import passportJWT from 'passport-jwt'

import { UserModel } from 'modules/user/models'

dotenv.config()

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const passportJWTStrategy = new JWTStrategy(
	{
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	async (jwtPayload, cb) => {
		const [err, user] = await to(Promise.resolve(UserModel.findById(jwtPayload.id)))

		if (err) {
			return cb(err)
		}

		return cb(null, user)
	},
)

export default passportJWTStrategy
