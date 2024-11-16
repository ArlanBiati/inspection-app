import { useMutation, useQueries } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'
import { Alert, ScrollView, Text, View } from 'react-native'

import Button from '@/components/button'
import { Loading } from '@/components/loading'
import Radio from '@/components/radio'
import Select from '@/components/select'
import Textarea from '@/components/textarea'
import { AnomailiesService } from '@/services/anomalies.service'
import { CategoriesService } from '@/services/categories.service'
import { EnvironmentsService } from '@/services/environments.service'
import { InspectionsService } from '@/services/inspections.service'

export default function CreateInspection() {
  const environmentsService = new EnvironmentsService()
  const anomaliesService = new AnomailiesService()
  const categoriesService = new CategoriesService()
  const inspectionsService = new InspectionsService()

  const [
    { data: environments, isLoading: environmentsLoading },
    { data: anomalies, isLoading: anomaliesLoading },
    { data: anomaliesTypes, isLoading: anomaliesTypesLoading },
    { data: categories, isLoading: categoriesLoading }
  ] = useQueries({
    queries: [
      {
        queryKey: ['environments-list'],
        queryFn: () => environmentsService.findAllEnvironments()
      },
      {
        queryKey: ['anomalies-list'],
        queryFn: () => anomaliesService.findAllAnomalies()
      },
      {
        queryKey: ['anomalies-types-list'],
        queryFn: () => anomaliesService.findAllAnomaliesTypes()
      },
      {
        queryKey: ['categories-list'],
        queryFn: () => categoriesService.findAllCategories()
      }
    ]
  })

  const isLoading = environmentsLoading || anomaliesLoading || anomaliesTypesLoading || categoriesLoading

  const { mutate } = useMutation({
    mutationFn: inspectionsService.createInspection,
    onSuccess: () => {
      Alert.alert('Sucesso!', 'Sua vistoria foi cadastrada com sucesso.', [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/inspection')
        }
      ])
    },
    onError: (error) => {
      alert(`${error.message}`)
    }
  })

  const transformedEnvironments = environments?.map((environment) => ({
    label: environment.nome,
    value: environment.id.toString()
  }))

  const transformedAnomalies = anomalies?.map((anomaly) => ({
    label: anomaly.nome,
    value: anomaly.id.toString()
  }))

  const transformedAnomaliesTypes = anomaliesTypes?.map((anomalyType) => ({
    label: anomalyType.descricao,
    value: anomalyType.enum
  }))

  const transformedCategories = categories?.map((category) => ({
    label: category.descricao,
    value: category.enum
  }))

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const radioOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false }
  ]

  function handleCreateInspection({ environmentId, hasAnamoly, anomalyId, anomalyType, category, observation }: any) {
    const formData = {
      areaVistoriaInterna_id: Number(environmentId),
      dataHora: new Date(),
      contemAnomalia: hasAnamoly,
      anomalia_id: Number(anomalyId),
      tipo: anomalyType,
      categoria: category,
      observacao: observation
    }

    mutate(formData)
  }

  return (
    <View className="mt-4 mb-10 p-4 flex-1 justify-between">
      {isLoading && <Loading />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30
        }}
      >
        <View className="gap-4 ">
          <Text>Selecione o ambiente</Text>
          <Select
            icon="chevron-down"
            formProps={{
              control,
              name: 'environmentId',
              rules: { required: 'O seleção é obrigatório' }
            }}
            options={transformedEnvironments!}
            error={errors.environmentId?.message}
          />

          <Text>Existe anomalia?</Text>
          <Radio
            formProps={{
              control,
              name: 'hasAnamoly',
              rules: { required: 'A seleção é obrigatória' }
            }}
            options={radioOptions}
            error={errors.hasAnamoly?.message}
          />

          <Text>Selecione a anomalia</Text>
          <Select
            icon="chevron-down"
            formProps={{
              control,
              name: 'anomalyId',
              rules: { required: 'A seleção é obrigatória' }
            }}
            options={transformedAnomalies!}
            error={errors.anomalyId?.message}
          />

          <Text>Selecione o tipo de anomalia</Text>
          <Select
            icon="chevron-down"
            formProps={{
              control,
              name: 'anomalyType',
              rules: { required: 'A seleção é obrigatória' }
            }}
            options={transformedAnomaliesTypes!}
            error={errors.anomalyType?.message}
          />

          <Text>Selecione a categoria</Text>
          <Select
            icon="chevron-down"
            formProps={{
              control,
              name: 'category',
              rules: { required: 'A seleção é obrigatória' }
            }}
            options={transformedCategories!}
            error={errors.category?.message}
          />

          <Text>Descreva a vistoria</Text>
          <Textarea
            formProps={{
              name: 'observation',
              control,
              rules: { required: 'O campo é obrigatória' }
            }}
            inputProps={{
              autoCapitalize: 'none',
              placeholder: 'Descreva...'
            }}
            error={errors.observation?.message}
          />
        </View>
      </ScrollView>
      <View className="mt-7">
        <Button title="Cadastrar" onPress={handleSubmit(handleCreateInspection)} />
      </View>
    </View>
  )
}
