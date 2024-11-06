// public-api.ts
import express from 'express'
import { create, get, root, update } from '../controller/user-controller'

export const publicRouter = express.Router()

publicRouter.get('/', root)
publicRouter.get('/api/user', get)
publicRouter.post('/api/user', create)
publicRouter.patch('/api/user/:username', update)
