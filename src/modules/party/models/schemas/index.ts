import mongoose, { SchemaDefinition } from 'mongoose'

const Schema = mongoose.Schema

export const partyOwner: SchemaDefinition = {
	id: String,
	email: String,
}

export const partySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		members: [String],
		totalMembers: Number,
		maxMembers: Number,
		owner: {
			type: partyOwner,
			_id: false,
		},
	},
	{ timestamps: true },
)
