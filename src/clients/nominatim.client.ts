import axios from 'axios'
import { injectable } from 'inversify'

@injectable()
export class NominatimClient {
  private prefixUrl = 'https://nominatim.openstreetmap.org'

  async getCoordinates(zip: string): Promise<any> {
    const resource = `search.php?q=${zip}&polygon_geojson=1&countrycodes=us&format=jsonv2`
    const endpoint = this.prefixUrl + '/' + resource
    const {
      data: [{ lat, lon }],
    } = await axios.get(endpoint)
    return [parseFloat(lat), parseFloat(lon)]
  }

  async getAddress(zip: string): Promise<any> {
    const { lat, lon } = await this.getCoordinates(zip)
    const resource = `reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
    const endpoint = this.prefixUrl + '/' + resource
    const {
      data: {
        address: { house_number, road, city, state, suburb },
      },
    } = await axios.get(endpoint)
    return {
      street1: `${house_number} ${road}`,
      city: city || suburb,
      state,
      zip,
    }
  }
}
