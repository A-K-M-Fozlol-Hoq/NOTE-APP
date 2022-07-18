import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';

export default function Home({navigation, route, user}) {
  console.log("user --> ", user)
  const onPressCreate =()=>{
    navigation.navigate("create")
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection:'row',justifyContent: 'space-between', padding:20}}>
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}><AntDesign name="pluscircleo" size={24} color="black" /></Pressable>
        
      </View>
    </SafeAreaView>
  )
}