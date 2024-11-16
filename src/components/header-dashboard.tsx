import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { useState } from 'react'

import { Loading } from './loading'

export default function HeaderDashboard() {
  const { user } = useUser()
  const { signOut, isLoaded } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  function logout() {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      signOut()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <View className=" bg-black h-48 px-6">
        <SafeAreaView>
          <View className="flex-row items-center justify-between mt-5">
            <View className="flex-row items-center">
              <View className="rounded-full bg-slate-400 h-20 w-20 mr-5 overflow-hidden items-center justify-center">
                <Image
                  source={{ uri: 'https://github.com/arlanbiati.png' }}
                  resizeMode="center"
                  width={70}
                  height={70}
                />
              </View>
              <View className="gap-1">
                <Text className="color-white font-bold text-xl">Olá,</Text>
                {user?.fullName ? (
                  <Text className="color-white text-lg">{user?.fullName}</Text>
                ) : (
                  <Text className="color-white text-lg">Vistoriador</Text>
                )}
              </View>
            </View>
            <View>
              <Link href="/login">
                <Pressable className="flex-col items-center gap-2" onPress={() => logout()}>
                  <Feather name="power" color="#fff" size={30} />
                  <Text className="text-white text-lg">Logout</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}
