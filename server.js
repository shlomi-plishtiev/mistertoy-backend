import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { logger } from './services/logger.service.js'
// logger.info('server.js loaded...')

const app = express()

// App Configuration
app.use(cookieParser()) 
app.use(express.json()) 

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('public'))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { toyRoutes } from './api/toy/toy.routes.js'

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/toy', toyRoutes)


// Fallback
app.get('/**', (req, res) => {
  res.sendFile(path.resolve(''))
})

const port =  process.env.PORT || 3030
app.listen(port, () =>
    logger.info((`Server listening on port http://127.0.0.1:${port}/`))
)
