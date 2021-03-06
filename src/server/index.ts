import dotenv from 'dotenv'
import express from 'express'

import initDatabase from 'core/database/utils/initDatabase'
import initMiddleware from 'core/middleware'
import startApp from './startApp'

dotenv.config()

const app = express()

initDatabase()
initMiddleware(app)
startApp(app)
