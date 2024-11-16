import { type LayoutChangeEvent, View } from 'react-native'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useCallback, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useFocusEffect } from 'expo-router'

import TabBarButton from './tab-bar-button'

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 })

  const buttonWidth = dimensions.width / state.routes.length

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    })
  }

  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }]
    }
  })

  useFocusEffect(
    useCallback(() => {
      tabPositionX.value = withSpring(buttonWidth * state.index, {
        duration: 1500
      })
    }, [state.index, buttonWidth])
  )

  return (
    <View
      className="absolute bottom-12 flex-row justify-between items-center mx-20 py-4 rounded-[35px] bg-slate-50 shadow-black shadow-inner"
      onLayout={onTabbarLayout}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: '#000',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25
          }
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 1500
          })
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TabBarButton
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#fff' : '#000'}
            label={label}
          />
        )
      })}
    </View>
  )
}
