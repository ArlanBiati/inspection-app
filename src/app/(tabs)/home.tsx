import { useQuery } from '@tanstack/react-query'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useState, useEffect } from 'react'

import HeaderDashboard from '@/components/header-dashboard'
import SearchBar from '@/components/search-bar'
import { CustomersService } from '@/services/customers.service'
import { type CustomersProps } from '@/types/customers.type'
import Card from '@/components/card'

export default function Home() {
  const customersService = new CustomersService()
  const {
    data: customers,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['customers-list'],
    queryFn: () => customersService.findAllCustomers(),
    refetchInterval: 1000
  })

  const filteredCustomersWithAllData = customers?.filter((customer) => {
    return customer.nome && customer.email && customer.telefone
  })

  const [filteredCustomers, setFilteredCustomers] = useState<CustomersProps[]>(filteredCustomersWithAllData || [])

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredCustomers(filteredCustomersWithAllData || [])
    } else {
      const filtered =
        filteredCustomersWithAllData?.filter((customer) => {
          const lowercasedQuery = query.toLowerCase()
          return (
            customer.nome.toLowerCase().includes(lowercasedQuery) ||
            customer.email.toLowerCase().includes(lowercasedQuery) ||
            customer.telefone.includes(query)
          )
        }) || []
      setFilteredCustomers(filtered)
    }
  }

  useEffect(() => {
    if (customers) {
      setFilteredCustomers(filteredCustomersWithAllData || [])
    }
  }, [customers])

  function CustomersList(item: CustomersProps) {
    return (
      <Card>
        <View className="flex-row">
          <Text className="text-lg">Nome: </Text>
          <Text className="text-lg font-bold">{item.nome}</Text>
        </View>
        <View className="flex-row">
          <Text className="text-lg">Telefone: </Text>
          <Text className="text-lg font-bold">{item.telefone}</Text>
        </View>
        <View className="flex-row">
          <Text className="text-lg">Email: </Text>
          <Text className="text-lg font-bold">
            {item.email.length > 25 ? `${item.email.slice(0, 25)}...` : item.email}
          </Text>
        </View>
      </Card>
    )
  }

  return (
    <>
      <HeaderDashboard />
      <SearchBar placeholder="Digite o nome do cliente..." onSearch={handleSearch} />
      <View className="px-10">
        <View className="my-3">
          <Text className="font-bold text-xl">Lista de clientes</Text>
        </View>
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => CustomersList(item)}
          showsVerticalScrollIndicator={false}
          className="max-h-[85%]"
          contentContainerStyle={{ paddingBottom: 180 }}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        />
      </View>
    </>
  )
}
