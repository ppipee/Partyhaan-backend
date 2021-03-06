import mongoose from 'mongoose'

import mongoConfig from 'core/database/config'

export default function initDatabase() {
	const dbUri = process.env.DB_URI

	mongoose
		.connect(dbUri, mongoConfig)
		.then(() => {
			console.log('Connect to MongoDB')
		})
		.catch((err) => console.log(err))
}
