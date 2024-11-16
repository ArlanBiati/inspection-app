import { ReactNode } from 'react'
import { View } from 'react-native'

interface CardProps {
  children: ReactNode
}

export default function Card({ children }: CardProps) {
  return <View className="bg-slate-400 my-5 rounded-md p-5">{children}</View>
}
