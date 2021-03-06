import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true },
)
