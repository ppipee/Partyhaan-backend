import bcrypt from 'bcrypt'

export default function compareBcrypt(password: string, hashPassword: string) {
	return bcrypt.compareSync(password, hashPassword)
}
