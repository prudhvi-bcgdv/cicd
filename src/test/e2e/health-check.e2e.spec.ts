import 'reflect-metadata'

import { App } from '../../bootstrap/app.bootstrap'
import * as request from 'supertest'
import { StatusCodes } from 'http-status-codes'

describe('[E2E] Testing Health Check', () => {
  let app: App
  beforeAll(() => {
    app = new App()
  })
  describe('[GET] /api/health-check', () => {
    it('should be able to make a request and get a response with 200 status', async () => {
      const response = await request(app.getServer()).get('/api/health-check')
      expect(response.statusCode).toBe(StatusCodes.OK)
      expect(response._body).toStrictEqual({ status: 'ok' })
    })
  })

  describe('[GET] /non-existing-endpoint', () => {
    it('should be able to make a request and get a response with 404 status', async () => {
      const response = await request(app.getServer()).get(
        '/non-existing-endpoint',
      )
      expect(response.statusCode).toBe(StatusCodes.NOT_FOUND)
      expect(response._body).toStrictEqual({
        // eslint-disable-next-line prettier/prettier
        message: 'Can\'t find /non-existing-endpoint on this server!',
      })
    })
  })
})
