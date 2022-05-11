import 'reflect-metadata'
import { HealthCheckController } from '../../controllers/health-check.controller'
import { HealthCheckService } from '../../services/health-check.service'

describe('Testing Health Check Controller IoC', () => {
  let healthCheckService: HealthCheckService
  let healthCheckController: HealthCheckController

  beforeEach(() => {
    healthCheckService = new HealthCheckService()
    healthCheckController = new HealthCheckController(healthCheckService)
  })

  it('Mocked health service dependency should return mocked data', async () => {
    const mockedStatus = { status: 'mocked ok' }
    jest
      .spyOn(healthCheckService, 'get')
      .mockImplementationOnce(async () => mockedStatus)

    const healthCheckResponse = await healthCheckController.get()
    expect(healthCheckResponse).toStrictEqual(mockedStatus)
  })
})
