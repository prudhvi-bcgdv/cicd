import { inject, injectable } from 'inversify'
import { NominatimClient } from '../clients/nominatim.client'
import { TYPES } from '../ioc/types.ioc'
import { REGIONS } from '../constants/constants'

@injectable()
export class LocationService {
  constructor(
    @inject(TYPES.NominatimClient)
    private nominatimClient: NominatimClient,
  ) {}

  deg2rad(deg): number {
    return deg * (Math.PI / 180)
  }

  getLatLonDistanceInKm([lat1, lon1], [lat2, lon2]): number {
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1) // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  async getNearestRegion(zip: string): Promise<any> {
    const zipLatLon = await this.nominatimClient.getCoordinates(zip)
    let nearestRegion
    let nearestDistance = Number.MAX_SAFE_INTEGER
    REGIONS.forEach((region) => {
      const distance = this.getLatLonDistanceInKm(
        [region.latitude, region.longitude],
        zipLatLon,
      )
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestRegion = region
      }
    })

    return nearestRegion
  }
}
