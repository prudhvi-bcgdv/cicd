import { inject, injectable } from 'inversify'
import { TYPES } from '../ioc/types.ioc'
import { LocationService } from './location.service'
import { predictableDeliveryDates } from '../mocks/predictableDeliberyDates.mock'
import { RateService } from './rate.service'
import { INVENTORY } from '../constants/constants'

@injectable()
export class ApiService {
  constructor(
    @inject(TYPES.LocationService)
    private locationService: LocationService,
    @inject(TYPES.RateService)
    private rateService: RateService,
  ) {}

  async getPredictableDeliveryDates(
    sku: string,
    destinationZip: string,
  ): Promise<any> {
    const { zip } = await this.locationService.getNearestRegion(destinationZip)

    const deliveryDates = predictableDeliveryDates.filter(
      ({ sku: predictionSku, destination_zip: predictionZip }) =>
        predictionSku === sku && predictionZip === zip.toString(),
    )

    const originZips = [
      ...new Set(deliveryDates.map(({ origin_zip }) => origin_zip)),
    ]
    const { weight, width, length, height } = INVENTORY.find(
      ({ sku: itemSku }) => sku === itemSku,
    )
    const getRateRequests = originZips.map((zip) =>
      this.rateService.get(zip, destinationZip, {
        weight,
        width,
        length,
        height,
      }),
    )
    const rates = await Promise.all(getRateRequests)
    const originZipRates = rates.map((zipRates, i) =>
      zipRates.map((rate) => ({
        ...rate,
        origin_zip: originZips[i],
      })),
    )

    return [deliveryDates, originZipRates.flat()]
  }
}
