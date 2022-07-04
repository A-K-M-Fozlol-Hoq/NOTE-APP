import { View, SafeAreaView,Image,  Text, TextInput,StyleSheet, Pressable,  } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Signup({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal:16, paddingVertical:25}}>
        <Input placeholder="Email address" />
        <Input placeholder="Password" secureTextEntry />
        <Input placeholder="Full name" />
        <Input placeholder="Age" />

        <Pressable stye={styles.radioContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}></View>
          </View>
          <Text style={styles.radioText}>Male</Text>
        </Pressable>

      </View>

      <View style={{flex:1, justifyContent:"flex-end", alignItems: "center", marginBottom:20}}>
        <Button title={"Sign up"} customStyles={{alignSelf:"center", marginBottom:60}} />
        <Pressable  onPress={() =>navigation.navigate("Signin")}>
          <Text>Already have an account?{" "} <Text style={{color:"green", fontWeight:'bold'}}>Sign in</Text> </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  radioContainer:{
  },
  outerCircle:{
  },
  innerCircle:{
  },
  radioText:{
  },
})