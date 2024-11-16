import { TextInput, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'

interface SearchBarProps {
  placeholder: string
  onSearch: (query: string) => void
}

export default function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <View className="flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
        className="flex-1 p-4 bg-gray-100 rounded-lg text-gray-700"
      />

      <TouchableOpacity
        onPress={handleSearch}
        className="ml-3 p-3 bg-black rounded-lg"
      >
        <Feather name="search" size={24} color="#E1E1E6" />
      </TouchableOpacity>
    </View>
  )
}
