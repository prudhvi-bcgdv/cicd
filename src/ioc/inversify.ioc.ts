import { Container } from 'inversify'
import { NominatimClient } from '../clients/nominatim.client'
import { HealthCheckController } from '../controllers/health-check.controller'
import { ApiController } from '../controllers/api.controller'
import { HealthCheckService } from '../services/health-check.service'
import { TYPES } from './types.ioc'
import { RateService } from '../services/rate.service'
import { FunctionClient } from '../clients/function.client'
import { LocationService } from '../services/location.service'
import { ApiService } from '../services/api.service'

const container = new Container()

container
  .bind<HealthCheckService>(TYPES.HealthCheckService)
  .to(HealthCheckService)
container
  .bind<HealthCheckController>(TYPES.HealthCheckController)
  .to(HealthCheckController)

container.bind<NominatimClient>(TYPES.NominatimClient).to(NominatimClient)
container.bind<FunctionClient>(TYPES.FunctionClient).to(FunctionClient)
container.bind<RateService>(TYPES.RateService).to(RateService)
container.bind<ApiController>(TYPES.RateController).to(ApiController)
container.bind<LocationService>(TYPES.LocationService).to(LocationService)
container.bind<ApiService>(TYPES.ApiService).to(ApiService)

export default container
