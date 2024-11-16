import { Feather } from '@expo/vector-icons'
import { Text, PlatformPressable } from '@react-navigation/elements'
import { useEffect } from 'react'
import { TouchableOpacityProps } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface TabBarButtonProps extends TouchableOpacityProps {
  isFocused: boolean
  routeName: string
  color: string
  label: string
}

const icon = {
  home: (props: any) => <Feather name="home" size={24} {...props} />,
  inspection: (props: any) => <Feather name="eye" size={24} {...props} />,
}

export default function TabBarButton({
  isFocused,
  routeName,
  color,
  label,
  ...rest
}: TabBarButtonProps) {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    )
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])

    const top = interpolate(scale.value, [0, 1], [0, 9])

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return { opacity }
  })

  return (
    <PlatformPressable
      {...rest}
      className="flex-1 items-center justify-center gap-1"
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color,
        })}
      </Animated.View>

      <Animated.Text style={[{ color, fontSize: 12 }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </PlatformPressable>
  )
}
