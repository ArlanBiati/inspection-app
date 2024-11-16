import { forwardRef } from 'react'
import { Controller, UseControllerProps } from 'react-hook-form'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { clsx } from 'clsx'

interface RadioProps {
  error?: string
  formProps: UseControllerProps
  options: { label: string; value: boolean }[]
}

const Radio = forwardRef<any, RadioProps>(
  ({ error = '', formProps, options }, ref) => {
    return (
      <Controller
        {...formProps}
        render={({ field }) => (
          <View>
            <View className="flex-row">
              {options.map((option) => (
                <TouchableWithoutFeedback
                  key={option.label}
                  onPress={() => field.onChange(option.value)}
                >
                  <View className="flex-row items-center mr-6 py-2 px-4 border rounded-3xl border-gray-200">
                    <View
                      className={clsx(
                        'w-5 h-5 rounded-full border-2',
                        field.value === option.value
                          ? 'border-black bg-black'
                          : 'border-gray-300 bg-white'
                      )}
                    />
                    <Text
                      className="ml-2"
                      style={{
                        color:
                          field.value === option.value ? '#333333' : '#000000',
                      }}
                    >
                      {option.label}{' '}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>

            {error.length > 0 && (
              <Text className="text-base mt-1 text-red-500">{error}</Text>
            )}
          </View>
        )}
      />
    )
  }
)

export default Radio
