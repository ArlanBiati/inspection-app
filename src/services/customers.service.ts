import { api } from '@/config/axios.config'
import { CustomersProps } from '@/types/customers.type'

export class CustomersService {
  private readonly endpoint: string

  constructor() {
    this.endpoint = '/cliente'
  }

  async findAllCustomers() {
    const response = await api.get<CustomersProps[] | []>(
      `${this.endpoint}/all`
    )
    return response.data
  }
}
