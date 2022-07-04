import { View, SafeAreaView,Image,  Text, TextInput,StyleSheet, Pressable,  } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

export default function Signin({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        style={{ height: 270, width: 320,  alignSelf: 'center' }}
        source={require('../../assets/empty-state.png')}
      />
      <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center'}}>Never forget your notes</Text>
      <View style={{paddingHorizontal:16, paddingVertical:25}}>
        <Input placeholder="Email address" />
        <Input placeholder="Password" secureTextEntry />
      </View>

      <View style={{flex:1, justifyContent:"flex-end", alignItems: "center", marginBottom:20,}}>
        <Button title={"Login"} customStyles={{alignSelf:"center", marginBottom:60, marginTop:20}} />
        <Pressable onPress={() =>navigation.navigate("Signup")}>
          <Text>Don't have an account?{" "} <Text style={{color:"green", fontWeight:'bold'}}>Sign up</Text> </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

