import bcrypt from 'bcrypt'
import { logger } from '../utils/logger'
import { Validation } from '../validation/Validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { UserValidation } from '../validation/user-validation'
import { CreateUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from '../models/user-model'

export const getUsers = async (): Promise<UserResponse[]> => {
  const users = await prismaClient.user.findMany()

  if (users.length === 0) {
    throw new ResponseError(404, 'No users found')
  }

  return users.map(toUserResponse)
}

export const createUser = async (request: CreateUserRequest): Promise<UserResponse> => {
  const registerRequest = Validation.validate(UserValidation.REGISTER, request)

  const totalUserWithSameUsername = await prismaClient.user.count({
    where: {
      username: registerRequest.username
    }
  })

  if (totalUserWithSameUsername != 0) {
    throw new ResponseError(400, 'Username already exists')
  }

  registerRequest.password = await bcrypt.hash(registerRequest.password, 10)

  const user = await prismaClient.user.create({
    data: registerRequest
  })

  return toUserResponse(user)
}

export const updateUser = async (username: string, request: UpdateUserRequest): Promise<UserResponse> => {
  try {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request)
    const user = await prismaClient.user.findFirst({
      where: {
        username
      }
    })

    if (!user) {
      throw new ResponseError(404, 'User not found')
    }
    if (updateRequest.name) {
      user.name = updateRequest.name
    }
    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10)
    }

    const userResult = await prismaClient.user.update({
      where: {
        username: user.username
      },
      data: user
    })

    return toUserResponse(userResult)
  } catch (error) {
    logger.error(error)
    throw new ResponseError(500, 'Internal Server Error')
  }
}
