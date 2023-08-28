import axios from 'axios'
import { RestApiEndpoint } from '@/models/Enums'

export default class RestApi {
  #axiosInstance
  #baseUrl = 'http://localhost:5173'

  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: this.#baseUrl
    })
  }

  async #wrapCall<T>(service: Promise<T>): Promise<T | any> {
    try {
      return await service
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.status)
      }
    }
  }

  public getProducts (search: string, limit: string) {
    return this.#wrapCall(this.#axiosInstance.get(RestApiEndpoint.products, { params: { limit, search }}))
  }
}
