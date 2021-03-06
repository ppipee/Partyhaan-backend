import { Request, Response } from 'express'

import hashBcrypt from 'core/auth/hashBcrypt'

import { UserModel } from 'modules/user/models'
import getUserWithToken from 'modules/user/utils/getUserWithToken'

const signup = async (req: Request, res: Response) => {
	const { password } = req.body

	const hashingPassword = hashBcrypt(password, Number(process.env.SALT_ROUND))

	const databaseUser = new UserModel({
		...req.body,
		password: hashingPassword,
	})

	await databaseUser.save()

	const [user, token] = getUserWithToken(databaseUser, process.env.JWT_SECRET)

	return res.status(201).send({ user, token })
}

export default signup
