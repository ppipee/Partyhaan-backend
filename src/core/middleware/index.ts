import bodyParser from 'body-parser'
import cors from 'cors'
import { Express } from 'express'
import passport from 'passport'

import passportJWTStrategy from 'core/auth/passportJWTStrategry'
import passportLocalStrategy from 'core/auth/passportLocalStrategry'

import allowHeader from './allowHeader'

export default function initMiddleware(app: Express) {
  passport.use(passportLocalStrategy)
  passport.use(passportJWTStrategy)

  app.use(cors())
  app.use(allowHeader)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
