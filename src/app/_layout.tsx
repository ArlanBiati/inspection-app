import '../styles/global.css'
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Slot, useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
  focusManager,
  onlineManager,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'
import { AppState, AppStateStatus } from 'react-native'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const client = new QueryClient({ queryCache: new QueryCache() })

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  function onFocusRefetch(status: AppStateStatus) {
    focusManager.setFocused(status === 'active')
  }

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] === '(auth)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/home')
    } else if (!isSignedIn) {
      router.replace('/login')
    }
  }, [isSignedIn])

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected)
      })
    })
  }, [NetInfo, onlineManager])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onFocusRefetch)

    return () => subscription.remove()
  }, [])

  return (
    <>
      <StatusBar style="light" translucent />
      <Slot />
    </>
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <QueryClientProvider client={client}>
        <InitialLayout />
      </QueryClientProvider>
    </ClerkProvider>
  )
}
