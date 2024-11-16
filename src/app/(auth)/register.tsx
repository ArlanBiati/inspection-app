import { useRef, useState } from 'react'
import { Link } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

import Button from '@/components/button'
import Input from '@/components/input'
import InputPassword from '@/components/input-password'
import { useForm } from 'react-hook-form'

export default function Register() {
  const { isLoaded, setActive, signUp } = useSignUp()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const lastNameRef = useRef<TextInput>(null)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [pendingEmailCode, setPendingEmailCode] = useState(false)

  async function handleSignUp({ firstName, lastName, email, password }: any) {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingEmailCode(true)
    } catch (error: any) {
      alert(error.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleVerifyUser({ code }: any) {
    if (!isLoaded) return
    setIsLoading(true)

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code,
      })

      await setActive({ session: completeSignUp.createdSessionId })
    } catch (error: any) {
      alert(error.errors[0].message)
    } finally {
      setIsLoading(false)
    }
  }

  console.log(errors)

  return (
    <View className="flex-1 justify-center p-5">
      {!pendingEmailCode && (
        <View>
          <Text className="text-center font-bold text-2xl mb-4">
            Criar uma conta
          </Text>
          <View className="gap-4 my-4">
            <Input
              icon="user"
              error={errors.firstName?.message}
              formProps={{
                name: 'firstName',
                control,
              }}
              inputProps={{
                autoCapitalize: 'none',
                placeholder: 'Digite seu primeiro nome',
                returnKeyType: 'next',
                onSubmitEditing: () => lastNameRef.current?.focus(),
              }}
            />
            <Input
              ref={lastNameRef}
              icon="user"
              error={errors.lastName?.message}
              formProps={{
                name: 'lastName',
                control,
              }}
              inputProps={{
                autoCapitalize: 'none',
                placeholder: 'Digite seu sobrenome',
                returnKeyType: 'next',
                onSubmitEditing: () => emailRef.current?.focus(),
              }}
            />
            <Input
              ref={emailRef}
              icon="mail"
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
              ref={passwordRef}
              error={errors.password?.message}
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
                onSubmitEditing: handleSubmit(handleSignUp),
              }}
            />
          </View>
          <Button
            title="Criar conta"
            loading={isLoading}
            disabled={isLoading}
            onPress={handleSubmit(handleSignUp)}
          />

          <Link href="/login" asChild>
            <TouchableOpacity className="m-2 items-center" activeOpacity={0.5}>
              <Text className="color-slate-500">
                Já possui uma conta?{' '}
                <Text className="color-black font-bold">Acesse!</Text>
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {pendingEmailCode && (
        <View>
          <Text className="text-center font-bold text-2xl mb-4">
            Digite o código:
          </Text>
          <View className="gap-6">
            <Input
              icon="key"
              error={errors.code?.message}
              formProps={{
                name: 'code',
                control,
                rules: { required: 'O código é obrigatório' },
              }}
              inputProps={{
                autoCapitalize: 'none',
                placeholder: 'Digite seu código',
                returnKeyType: 'send',
                onSubmitEditing: handleSubmit(handleVerifyUser),
              }}
            />
            <Button
              title="Ativar conta"
              loading={isLoading}
              disabled={isLoading}
              onPress={handleSubmit(handleVerifyUser)}
            />
          </View>
        </View>
      )}
    </View>
  )
}
