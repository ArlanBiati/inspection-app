import { useQuery } from '@tanstack/react-query'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'expo-router'

import SearchBar from '@/components/search-bar'
import { InspectionsService } from '@/services/inspections.service'
import { type InspectionsProps } from '@/types/inspections.type'
import IconButton from '@/components/icon-button'
import Card from '@/components/card'

export default function Inspection() {
  const inspectionsService = new InspectionsService()
  const {
    data: inspections,
    isRefetching,
    refetch
  } = useQuery({
    queryKey: ['inspections-list'],
    queryFn: () => inspectionsService.findAllInspections(),
    refetchInterval: 1000
  })

  const filteredInspectionsWithAllData = inspections
    ?.filter((inspection) => {
      return inspection.anomalia && inspection.categoria
    })
    .sort((a, b) => {
      const dateA = new Date(a.dataHora)
      const dateB = new Date(b.dataHora)
      return dateB.getTime() - dateA.getTime()
    })

  const [filteredInspections, setFilteredInspections] = useState<InspectionsProps[]>([])

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredInspections(filteredInspectionsWithAllData || [])
    } else {
      const filtered =
        filteredInspectionsWithAllData?.filter((inspection) => {
          return String(inspection.id).includes(query)
        }) || []
      setFilteredInspections(filtered)
    }
  }

  useEffect(() => {
    if (inspections) {
      setFilteredInspections(filteredInspectionsWithAllData || [])
    }
  }, [inspections])

  function InspectionsList(item: InspectionsProps) {
    return (
      <Card>
        <View className="flex-row justify-between">
          <View className="flex-row">
            <Text className="text-lg">Identificação: </Text>
            <Text className="text-lg font-bold">{item.id}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-lg">Data: </Text>
            <Text className="text-lg font-bold">{format(item.dataHora, 'dd/MM/yyyy')}</Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-row">
            <Text className="text-lg">Categoria: </Text>
            <Text className="text-lg font-bold">{item.categoria?.descricao}</Text>
          </View>
        </View>
        <View className="flex-row">
          <Text className="text-lg">Anomalia: </Text>
          <Text className="text-lg font-bold">{item.anomalia?.nome}</Text>
        </View>
        <View className="absolute right-4 bottom-4">
          <IconButton icon="chevrons-right" />
        </View>
      </Card>
    )
  }

  return (
    <>
      <SearchBar placeholder="Digite o id da vistoria" onSearch={handleSearch} />
      <View className="px-10">
        <View className="my-3 flex-row items-center justify-between">
          <Text className="font-bold text-xl">Lista de vistorias</Text>
          <Link href="/inspection/create-inspection" asChild>
            <IconButton icon="plus" />
          </Link>
        </View>
        <FlatList
          data={filteredInspections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => InspectionsList(item)}
          showsVerticalScrollIndicator={false}
          className="max-h-[85%]"
          contentContainerStyle={{ paddingBottom: 80 }}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        />
      </View>
    </>
  )
}
