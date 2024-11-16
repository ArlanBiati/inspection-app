import { ActivityIndicator, View } from 'react-native'

export function Loading() {
  return (
    <View className="flex-1 bg-black opacity-70 z-50 items-center justify-center absolute inset-0">
      <ActivityIndicator size="large" color="#FFF" />
    </View>
  )
}
