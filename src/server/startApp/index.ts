import { Express } from 'express'
import routes from 'routes'

const PORT = process.env.PORT || 8000

export default function startApp(app: Express) {
  app.use('/', routes)

  app.listen(PORT, () => {
    console.log(`Server run listening on port ${PORT}`)
  })
}
