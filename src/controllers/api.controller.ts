import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  next,
  requestBody,
  requestParam,
} from 'inversify-express-utils'
import { RateService } from '../services/rate.service'
import * as express from 'express'
import { TYPES } from '../ioc/types.ioc'
import { GetRatesRequest } from './model/getRatesRequest.model'
import { GetPredictableDeliveryDatesRequest } from './model/getPredictableDeliveryDates.model'
import { ApiService } from '../services/api.service'

@controller('/api')
export class ApiController implements interfaces.Controller {
  constructor(
    @inject(TYPES.RateService)
    private rateService: RateService,
    @inject(TYPES.ApiService)
    private apiService: ApiService,
  ) {}

  @httpGet('/address/:zip')
  async getAddress(
    @requestParam('zip') zip: string,
    @next() next: express.NextFunction,
  ): Promise<any> {
    try {
      const response = await this.rateService.getAddress(zip)
      return response
    } catch (error) {
      next(error)
    }
  }

  @httpPost('/rates')
  async getRates(
    @requestBody() ratesBody: GetRatesRequest,
    @next() next: express.NextFunction,
  ): Promise<any> {
    try {
      return this.rateService.get(
        ratesBody.originZip,
        ratesBody.destinationZip,
        ratesBody.parcel,
      )
    } catch (error) {
      next(error)
    }
  }

  @httpPost('/predictableDeliveryDates')
  async getPredictableDeliveryDates(
    @requestBody()
    predictableDeliveryDatesBody: GetPredictableDeliveryDatesRequest,
    @next() next: express.NextFunction,
  ): Promise<any> {
    try {
      return this.apiService.getPredictableDeliveryDates(
        predictableDeliveryDatesBody.sku,
        predictableDeliveryDatesBody.destinationZip,
      )
    } catch (error) {
      next(error)
    }
  }
}
