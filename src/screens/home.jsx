import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Home</Text>
    </SafeAreaView>
  )
}