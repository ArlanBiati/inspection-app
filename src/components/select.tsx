import { Feather } from '@expo/vector-icons'
import { clsx } from 'clsx'
import { forwardRef, useState } from 'react'
import { Controller, type UseControllerProps } from 'react-hook-form'
import { Text, View, TouchableWithoutFeedback, Button, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker'

interface SelectProps {
  icon?: keyof typeof Feather.glyphMap
  error?: string
  formProps: UseControllerProps
  options: { label: string; value: string | number }[]
}

const Select = forwardRef<any, SelectProps>(({ icon, error = '', formProps, options }, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<string>('')

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleBlur = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    setIsOpen(false)
  }

  return (
    <Controller
      {...formProps}
      render={({ field }) => (
        <View>
          <TouchableWithoutFeedback onPress={handleFocus}>
            <View
              className={clsx(
                'bg-white h-16 flex-row border rounded-lg items-center px-5',
                error.length > 0 ? 'border-red-500' : 'border-gray-200'
              )}
            >
              {!!icon && <Feather className="border-r pr-3 border-gray-300" name={icon} size={24} />}
              <Text className="flex-1 pl-4">
                {selectedLabel || (field.value ? field.value : 'Selecione uma opção')}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <Modal visible={isOpen} animationType="slide" transparent={true} onRequestClose={handleBlur}>
            <View
              className="flex-1 justify-end"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
            >
              <View className="bg-white px-5 pb-10 rounded-t-[20px]">
                <Picker
                  ref={ref}
                  selectedValue={field.value}
                  onValueChange={(value) => {
                    const selectedOption = options.find((option) => option.value === value)
                    if (selectedOption) {
                      setSelectedLabel(selectedOption.label)
                    }
                    field.onChange(value)
                  }}
                  style={{ height: 200 }}
                >
                  {options?.map((option) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                  ))}
                </Picker>

                <View style={{ marginTop: 20 }}>
                  <Button title="Confirmar Seleção" onPress={handleConfirm} />
                </View>
              </View>
            </View>
          </Modal>

          {error.length > 0 && <Text className="text-base mt-1 text-red-500">{error}</Text>}
        </View>
      )}
    />
  )
})

export default Select
