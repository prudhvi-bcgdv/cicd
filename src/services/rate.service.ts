import { inject, injectable } from 'inversify'
import { Parcel } from '../clients/domain/parcel.domain'
import { FunctionClient } from '../clients/function.client'
import { NominatimClient } from '../clients/nominatim.client'
import { TYPES } from '../ioc/types.ioc'

@injectable()
export class RateService {
  constructor(
    @inject(TYPES.NominatimClient)
    private nominatimClient: NominatimClient,
    @inject(TYPES.FunctionClient)
    private functionClient: FunctionClient,
  ) {}
  getAddress(zip: string): Promise<any> {
    return this.nominatimClient.getAddress(zip)
  }

  get(originZip: string, destinationZip: string, parcel: Parcel): Promise<any> {
    return this.functionClient.getRates(originZip, destinationZip, parcel)
  }
}
