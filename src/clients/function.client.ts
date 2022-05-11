import axios from 'axios'
import { injectable } from 'inversify'
import { Parcel } from './domain/parcel.domain'

@injectable()
export class FunctionClient {
  private prefixUrl = 'https://us-east1-ctd-poc.cloudfunctions.net'

  async getRates(
    originZip: string,
    destinationZip: string,
    parcel: Parcel,
  ): Promise<any> {
    const resource = 'ctd-mce-getRates'
    const endpoint = this.prefixUrl + '/' + resource
    const { data } = await axios.post(endpoint, {
      origin_zip: originZip,
      destination_zip: destinationZip,
      parcel,
    })
    return data
  }
}
