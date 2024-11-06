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
    const response = await supertest(web).get('/api/users/current').set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('test')
    expect(response.body.data.name).toBe('test')
  })

  it('should reject get user if token is invalid', async () => {
    const response = await supertest(web).get('/api/users/current').set('X-API-TOKEN', 'salah')

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
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

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.name).toBe('benar')
  })

  it('should be able to update user password', async () => {
    const response = await supertest(web).patch('/api/user/test').send({
      password: 'benar'
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)

    const user = await UserTest.get()
    expect(await bcrypt.compare('benar', user.password)).toBe(true)
  })
})

describe('DELETE /api/user/current', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('should be able to logout', async () => {
    const response = await supertest(web).delete('/api/users/current').set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data).toBe('OK')

    const user = await UserTest.get()
  })

  it('should reject logout user if token is wrong', async () => {
    const response = await supertest(web).delete('/api/users/current').set('X-API-TOKEN', 'salah')

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
})
