import { View, SafeAreaView,Image,  Text, TextInput,StyleSheet, Pressable,  } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth, db} from '../../App.js'
import { showMessage } from 'react-native-flash-message'


export default function SignIn({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const logIn = () => {
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log('Signed in successfully', res);
    })
    .catch((err) => {
      console.log('error --> ', err);
      showMessage({
        message: 'ERROR!',
        type:'danger'
      })
    })
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        style={{ height: 270, width: 320,  alignSelf: 'center' }}
        source={require('../../assets/empty-state.png')}
      />
      <Text style={{fontSize:18, fontWeight: 'bold', textAlign: 'center'}}>Never forget your notes</Text>
      <View style={{paddingHorizontal:16, paddingVertical:25}}>
        <Input placeholder="Email address" autoCapitalize='none' onChangeText={(text)=>setEmail(text)} />
        <Input placeholder="Password" secureTextEntry onChangeText={(text)=>setPassword(text)} />
      </View>

      <View style={{flex:1, justifyContent:"flex-end", alignItems: "center", marginBottom:20,}}>
        <Button onPress={logIn} title={"Login"} customStyles={{alignSelf:"center", marginBottom:60, marginTop:20}} />
        <Pressable onPress={() =>navigation.navigate("Signup")}>
          <Text>Don't have an account?{" "} <Text style={{color:"green", fontWeight:'bold'}}>Sign up</Text> </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

