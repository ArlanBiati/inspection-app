import { Stack } from 'expo-router'

export default function PublcLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: 'black' },
        headerTintColor: '#fff'
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Criar conta'
        }}
      />
    </Stack>
  )
}
