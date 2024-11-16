import { Feather } from '@expo/vector-icons'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native'

interface IconButtonProps extends TouchableOpacityProps {
  icon: keyof typeof Feather.glyphMap
}

export default function IconButton({ icon = 'home', ...props }: IconButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className="bg-black rounded-full w-12 h-12 items-center justify-center"
      activeOpacity={0.6}
    >
      <Feather name={icon} size={25} color="#fff" />
    </TouchableOpacity>
  )
}
