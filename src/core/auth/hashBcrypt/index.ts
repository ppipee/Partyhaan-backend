import bcrypt from 'bcrypt'

export default function hashBcrypt(password: string, saltRound: number) {
	return bcrypt.hashSync(password, saltRound)
}
