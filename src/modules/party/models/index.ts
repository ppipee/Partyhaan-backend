import mongoose, { Document } from 'mongoose'

import { Party } from '../types'
import { partySchema } from './schemas'

export type PartyDoc = Party & Document
export type PartyPlain = PartyDoc & { _id?: string }

export const PartyModel = mongoose.model<PartyDoc>('Party', partySchema)
