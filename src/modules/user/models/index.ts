import mongoose, { Document } from 'mongoose'

import { User } from 'modules/user/types'

import { userSchema } from './schemas'

export type UserDoc = User & Document

export const UserModel = mongoose.model<UserDoc>('User', userSchema)
