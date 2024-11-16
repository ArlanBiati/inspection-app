import React, { forwardRef, useState } from 'react'
import { clsx } from 'clsx'
import { Feather } from '@expo/vector-icons'
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { Controller, UseControllerProps } from 'react-hook-form'

interface InputPasswordProps {
  icon?: keyof typeof Feather.glyphMap
  error?: string
  formProps: UseControllerProps
  inputProps: TextInputProps
}

const InputPassword = forwardRef<TextInput, InputPasswordProps>(
  ({ icon, error = '', formProps, inputProps }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState)
    }

    return (
      <Controller
        {...formProps}
        render={({ field }) => (
          <View>
            <View
              className={clsx(
                'bg-white h-16 flex-row border rounded-lg items-center px-5',
                error.length > 0 ? 'border-red-500' : 'border-gray-200'
              )}
            >
              {!!icon && (
                <Feather
                  className="border-r pr-3 border-gray-300"
                  name={icon}
                  size={24}
                />
              )}

              <TextInput
                ref={ref}
                {...inputProps}
                value={field.value}
                onChangeText={field.onChange}
                secureTextEntry={!isPasswordVisible}
                className="mx-1 pl-4 flex-1"
              />

              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Feather
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                  className="ml-3"
                />
              </TouchableOpacity>
            </View>
            {error.length > 0 && (
              <Text className="text-base mt-1 color-red-500">{error}</Text>
            )}
          </View>
        )}
      />
    )
  }
)

export default InputPassword
