import { clsx } from 'clsx'
import { forwardRef } from 'react'
import { Controller, type UseControllerProps } from 'react-hook-form'
import { Text, TextInput, type TextInputProps, View } from 'react-native'

interface TextareaProps {
  error?: string
  formProps: UseControllerProps
  inputProps: TextInputProps
}

const Textarea = forwardRef<TextInput, TextareaProps>(({ error = '', formProps, inputProps }, ref) => {
  return (
    <Controller
      {...formProps}
      render={({ field }) => (
        <View>
          <View
            className={clsx(
              'bg-white h-44 border rounded-lg items-center px-5',
              error.length > 0 ? 'border-red-500' : 'border-gray-200'
            )}
          >
            <TextInput
              ref={ref}
              {...inputProps}
              value={field.value}
              onChangeText={field.onChange}
              multiline
              className="flex-1 w-full"
            />
          </View>
          {error.length > 0 && <Text className="text-base mt-1 text-red-500">{error}</Text>}
        </View>
      )}
    />
  )
})

export default Textarea
