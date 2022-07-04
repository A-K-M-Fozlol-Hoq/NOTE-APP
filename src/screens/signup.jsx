import { View, SafeAreaView,Image,  Text, TextInput,StyleSheet, Pressable,  } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function SignUp({navigation}) {
  const genderOptions = ["Male", "Female"]
  const [gender, setGender] = useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const auth = getAuth();

  const signUp = ()=>{
    // step 1: Create a new user
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // step 2: Create the user profile in the database
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal:16, paddingVertical:25}}>
        <Input placeholder="Email address" onChangeText={(text)=>setEmail(text)} />
        <Input placeholder="Password" secureTextEntry onChangeText={(text)=>setPassword(text)} />
        <Input placeholder="Full name" onChangeText={(text)=>setName(text)} />
        <Input placeholder="Age" onChangeText={(text)=>setAge(text)} />

        <View><Text style={{marginVertical:20}}>Select Gender</Text></View>

        {
          genderOptions.map(option =>{
            const selected = option === gender;
            return (
              <Pressable onPress={()=>setGender(option)} key={option} style={styles.radioContainer}>
              <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}></View>
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
            )
          })
        }

      </View>

      <View style={{flex:1, justifyContent:"flex-end", alignItems: "center", marginBottom:20}}>
        <Button onPress={signUp}  title={"Sign up"} customStyles={{alignSelf:"center", marginBottom:60, marginTop:20}} />
        <Pressable  onPress={() =>navigation.navigate("Signin")}>
          <Text>Already have an account?{" "} <Text style={{color:"green", fontWeight:'bold'}}>Sign in</Text> </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  radioContainer:{
    flexDirection:"row",
    alignItems: "center",
    marginBottom:25,
  },
  outerCircle:{
    height:30,
    width:30,
    borderRadius:15,
    borderWidth:1,
    borderColor: '#cfcfcf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle:{
    height:15,
    width:15,
    borderRadius:7.5,
    borderWidth:1,
    borderColor: '#cfcfcf',
  },
  radioText:{
    marginLeft:10
  },
  selectedOuterCircle:{
    borderColor:"orange",
  },
  selectedInnerCircle:{
    backgroundColor:"orange",
    borderColor:"orange"
  }
})