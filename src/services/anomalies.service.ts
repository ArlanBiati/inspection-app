import { api } from '@/config/axios.config'
import { Anomalies, AnomaliesTypes } from '@/types/inspections.type'

export class AnomailiesService {
  private readonly endpoint: string

  constructor() {
    this.endpoint = '/anomalia'
  }

  async findAllAnomalies() {
    const response = await api.get<Anomalies[] | []>(`${this.endpoint}/all`)
    return response.data
  }

  async findAllAnomaliesTypes() {
    const response = await api.get<AnomaliesTypes[] | []>(`tipoanomalia/all`)
    return response.data
  }
}
