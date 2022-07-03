import { View, SafeAreaView,Image,  Text, TextInput } from 'react-native'
import React from 'react'

export default function Signin() {
  return (
    <SafeAreaView>
      <Image
        style={{ height: 270, width: 320,  alignSelf: 'center' }}
        source={require('../../assets/empty-state.png')}
      />
      <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center'}}>Never forget your notes</Text>
      <View>
        <TextInput placeholder="emaol" />
      </View>
    </SafeAreaView>
  )
}