import { injectable } from 'inversify'
import { IHealthCheck } from '../interfaces/health-check.interface'

@injectable()
export class HealthCheckService {
  get(): Promise<IHealthCheck> {
    return Promise.resolve({ status: 'ok' })
  }
}
