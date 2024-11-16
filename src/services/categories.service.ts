import { api } from '@/config/axios.config'
import { Categories } from '@/types/inspections.type'

export class CategoriesService {
  private readonly endpoint: string

  constructor() {
    this.endpoint = '/categoriaprioridade'
  }

  async findAllCategories() {
    const response = await api.get<Categories[] | []>(`${this.endpoint}/all`)
    return response.data
  }
}
