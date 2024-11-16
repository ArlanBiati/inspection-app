import { api } from '@/config/axios.config'
import { Environments } from '@/types/inspections.type'

export class EnvironmentsService {
  private readonly endpoint: string

  constructor() {
    this.endpoint = '/ambiente'
  }

  async findAllEnvironments() {
    const response = await api.get<Environments[] | []>(`${this.endpoint}/all`)
    return response.data
  }
}
