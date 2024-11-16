import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { clsx } from 'clsx'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  backgroundColor?: string
  textColor?: string
  loading?: boolean
  disabled?: boolean
}

export default function Button({
  title,
  backgroundColor = 'bg-black',
  textColor = 'text-white',
  loading = false,
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className={clsx('rounded-lg py-5 px-5 items-center', backgroundColor, {
        'opacity-70': disabled,
      })}
      activeOpacity={0.6}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className={clsx('font-bold text-xl', textColor)}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
