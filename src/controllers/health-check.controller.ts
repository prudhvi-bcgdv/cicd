import { inject } from 'inversify'
import { controller, httpGet, interfaces } from 'inversify-express-utils'
import { IHealthCheck } from '../interfaces/health-check.interface'
import { TYPES } from '../ioc/types.ioc'
import { HealthCheckService } from '../services/health-check.service'

@controller('/health-check')
export class HealthCheckController implements interfaces.Controller {
  constructor(
    @inject(TYPES.HealthCheckService)
    private healthCheckService: HealthCheckService,
  ) {}

  @httpGet('/')
  get(): Promise<IHealthCheck> {
    return this.healthCheckService.get()
  }
}
