// public-api.ts
import express from 'express'
import { create, get, root, update, remove } from '../controller/user-controller'

export const publicRouter = express.Router()

publicRouter.get('/', root)
publicRouter.get('/api/user', get)
publicRouter.post('/api/user', create)
publicRouter.delete('/api/user/:username', remove)
publicRouter.patch('/api/user/:username', update)
