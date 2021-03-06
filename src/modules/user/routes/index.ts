import express from 'express'

import { signup, signin, getMe } from 'modules/user/controllers'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/me', getMe)

export default router
