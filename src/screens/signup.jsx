import { View, SafeAreaView,Image,  Text, TextInput,StyleSheet, Pressable,  } from 'react-native'
import React from 'react'
import Button from '../components/Button'

export default function Signup() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal:16, paddingVertical:25}}>
        <TextInput style={styles.input} placeholder="Email address" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />

        
      </View>

      <View style={{flex:1, justifyContent:"flex-end", alignItems: "center", marginBottom:20}}>
        <Button title={"Sign up"} customStyles={{alignSelf:"center", marginBottom:60}} />
        <Pressable>
          <Text>Already have an account?{" "} <Text style={{color:"green", fontWeight:'bold'}}>Sign in</Text> </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  input:{
    height:48,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    marginBottom:25
  }
})