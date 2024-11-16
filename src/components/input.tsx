import { Feather } from '@expo/vector-icons'
import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Controller, type UseControllerProps } from 'react-hook-form'
import { Text, TextInput, type TextInputProps, View } from 'react-native'

interface InputProps {
  icon?: keyof typeof Feather.glyphMap
  error?: string
  formProps: UseControllerProps
  inputProps: TextInputProps
}

const Input = forwardRef<TextInput, InputProps>(({ icon, error = '', formProps, inputProps }, ref) => {
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
            {!!icon && <Feather className="border-r pr-3 border-gray-300" name={icon} size={24} />}
            <TextInput
              ref={ref}
              {...inputProps}
              value={field.value}
              onChangeText={field.onChange}
              className="mx-1 pl-4 flex-1"
            />
          </View>
          {error.length > 0 && <Text className="text-base mt-1 color-red-500">{error}</Text>}
        </View>
      )}
    />
  )
})

export default Input
