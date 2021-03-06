import express from 'express'

import { getParties, joinParty, newParty } from 'modules/party/controllers'
import auth from 'modules/user/middleware/auth'
import optionalAuth from 'modules/user/middleware/optionalAuth'

const router = express.Router()

router.get('/', optionalAuth, getParties)
router.post('/', auth, newParty)
router.put('/:partyId', auth, joinParty)

export default router
