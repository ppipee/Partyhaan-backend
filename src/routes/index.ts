import express from 'express'

import partyRoutes from 'modules/party/routes'
import userRoutes from 'modules/user/routes'

import { PARTIES_PATH, USERS_PATH } from './constants'

const router = express.Router()

router.get('/', (req, res) => res.send('Party Haan Server'))

router.use(USERS_PATH, userRoutes)
router.use(PARTIES_PATH, partyRoutes)

export default router
