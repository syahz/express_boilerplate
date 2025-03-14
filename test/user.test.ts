import supertest from 'supertest'
import { web } from '../src/application/web'
import { logger } from '../src/utils/logger'
import { UserTest } from './test-util'
import bcrypt from 'bcrypt'

describe('POST /api/user', () => {
  afterEach(async () => {
    await UserTest.delete()
  })

  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(web).post('/api/user').send({
      username: '',
      password: '',
      name: ''
    })

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should register new user', async () => {
    const response = await supertest(web).post('/api/user').send({
      username: 'test',
      password: 'test',
      name: 'test'
    })

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('test')
    expect(response.body.data.name).toBe('test')
  })
})

describe('GET /api/user/', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('should be able to get user', async () => {
    const response = await supertest(web).get('/api/user')

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(200)
  })
})

describe('PATCH /api/user', () => {
  beforeEach(async () => {
    await UserTest.create()
  })
  afterEach(async () => {
    await UserTest.delete()
  })

  it('should reject update user if request is invalid', async () => {
    const response = await supertest(web).patch('/api/user/test').send({
      password: '',
      name: ''
    })

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should be able to update user name', async () => {
    const response = await supertest(web).patch('/api/user/test').send({
      name: 'benar'
    })

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe('benar')
  })

  it('should be able to update user password', async () => {
    const response = await supertest(web).patch('/api/user/test').send({
      password: 'benar'
    })

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(200)

    const user = await UserTest.get()
    expect(await bcrypt.compare('benar', user.password)).toBe(true)
  })
})

describe('DELETE /api/user', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('should be able to delete user', async () => {
    const response = await supertest(web).delete('/api/user/test')

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('test')
    expect(response.body.data.name).toBe('test')
  })

  it('should reject delete user if username not found', async () => {
    const response = await supertest(web).delete('/api/user/tost')

    logger.debug(JSON.stringify(response.body, null, 2))
    expect(response.status).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
})
