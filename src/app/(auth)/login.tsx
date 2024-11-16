import { useRef, useState } from 'react'
import { Link } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useSignIn } from '@clerk/clerk-expo'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Input from '@/components/input'
import Button from '@/components/button'
import InputPassword from '@/components/input-password'

export default function Login() {
  const { isLoaded, setActive, signIn } = useSignIn()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const passwordRef = useRef<TextInput>(null)

  const [isLoading, setIsLoading] = useState(false)

  async function handleSignIn({ email, password }: any) {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const { createdSessionId, status } = await signIn?.create({
        identifier: email,
        password,
      })

      if (status === 'complete') {
        await setActive({ session: createdSessionId })
      }
    } catch (error: any) {
      alert(error.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-center p-5">
      <View className="items-center">
        <Image
          className="ml-6 mb-20"
          source={require('../../../assets/images/inspection-logo.png')}
        />
      </View>

      <Text className="text-center font-bold text-2xl mb-4">Acessar conta</Text>
      <View className="gap-4 my-4">
        <Input
          icon="user"
          error={errors.email?.message}
          formProps={{
            name: 'email',
            control,
            rules: {
              required: 'Email é obrigatório',
              pattern: {
                value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/,
                message: 'Email inválido',
              },
            },
          }}
          inputProps={{
            autoCapitalize: 'none',
            placeholder: 'Digite seu email',
            returnKeyType: 'next',
            onSubmitEditing: () => passwordRef.current?.focus(),
          }}
        />
        <InputPassword
          icon="lock"
          error={errors.password?.message}
          ref={passwordRef}
          formProps={{
            name: 'password',
            control,
            rules: { required: 'Senha é obrigatório' },
          }}
          inputProps={{
            autoCapitalize: 'none',
            placeholder: 'Digite sua senha',
            returnKeyType: 'send',
            secureTextEntry: true,
            onSubmitEditing: handleSubmit(handleSignIn),
          }}
        />
      </View>
      <Button
        title="Acessar"
        loading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit(handleSignIn)}
      />

      <Link href="/register" asChild>
        <TouchableOpacity className="m-2 items-center" activeOpacity={0.5}>
          <Text className="color-slate-500">
            Ainda não possui uma conta?{' '}
            <Text className="color-black font-bold">Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}
