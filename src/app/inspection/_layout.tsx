import { Link, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function InspectionLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff'
      }}
    >
      <Stack.Screen
        name="create-inspection"
        options={{
          headerTitle: 'Cadastrar vistoria',
          headerLeft: () => (
            <Link href="/(tabs)/inspection" asChild>
              <TouchableOpacity>
                <Feather name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
            </Link>
          )
        }}
      />
    </Stack>
  )
}
