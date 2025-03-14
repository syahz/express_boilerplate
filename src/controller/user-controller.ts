import { NextFunction, Request, Response } from 'express'
import { getUsers, createUser, updateUser, removeUser } from '../services/user-services'
import { CreateUserRequest, UpdateUserRequest } from '../models/user-model'

export const root = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      data: 'OK'
    })
  } catch (e) {
    next(e)
  }
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getUsers()
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: CreateUserRequest = req.body as CreateUserRequest
    const response = await createUser(request)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: UpdateUserRequest = req.body as UpdateUserRequest
    const username = String(req.params.username)
    const response = await updateUser(username, request)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = String(req.params.username)
    const response = await removeUser(username)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}