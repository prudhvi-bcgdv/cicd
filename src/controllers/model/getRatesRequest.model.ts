import { Parcel } from '../../clients/domain/parcel.domain'

export class GetRatesRequest {
  originZip: string
  destinationZip: string
  parcel: Parcel
}
