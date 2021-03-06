import { Request, Response } from 'express'
import passport from 'passport'

import getUserData from 'modules/user/utils/getUserData'

const getMe = async (req: Request, res: Response) => {
	passport.authenticate('jwt', { session: false }, (err, databaseUser, info) => {
		console.log(databaseUser)
		if (err) return res.send({ message: err })

		if (databaseUser) {
			const user = getUserData(databaseUser)

			return res.status(200).send(user)
		}

		return res.status(404).send('not found user')
	})(req, res)
}

export default getMe
