import express from 'express'
import { publicRouter } from '../routes/api'
import { errorMiddleware } from '../middleware/error-middleware'
import cors from 'cors'
export const web = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

web.use(cors(corsOptions))

web.use(cors(corsOptions))

web.use(express.json())
web.use(publicRouter)
web.use(errorMiddleware)
