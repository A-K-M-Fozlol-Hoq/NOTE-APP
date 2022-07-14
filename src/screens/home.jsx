import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection:'row',justifyContent: 'space-between', padding:20}}>
        <Text>My Notes</Text>
      </View>
    </SafeAreaView>
  )
}