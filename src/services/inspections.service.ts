import { api } from '@/config/axios.config'
import { type CreateInspection, type InspectionsProps } from '@/types/inspections.type'

export class InspectionsService {
  private readonly endpoint: string

  constructor() {
    this.endpoint = '/vistoria'
  }

  async findAllInspections() {
    const response = await api.get<InspectionsProps[] | []>(`${this.endpoint}/all`)
    return response.data
  }

  async findOneInspection(id: number) {
    const response = await api.get<InspectionsProps[] | []>(`${this.endpoint}/${id}`)
    return response.data
  }

  async createInspection(payload: CreateInspection) {
    return await api.post<CreateInspection>(`${this.endpoint}`, payload)
  }
}
