import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../components/Input'
import Button from '../components/Button'
import { db } from '../../App'
import { collection , addDoc } from 'firebase/firestore'
import { showMessage } from 'react-native-flash-message'

const noteColorOptions = ['red','blue','green']

export default function Edit({navigation, route, user}) {
  console.log('user -->', user,user.uid)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [noteColor, setNoteColor] = useState('blue');
  const [loading, setLoading] = useState(false);

  const onPressCreate = async ()=>{
    setLoading(true)
    try{
      const docRef = await addDoc(collection(db, 'notes'),{
        title:title,
        description:description,
        color:noteColor,
        uid: user.uid
      })
      setLoading(false);
      showMessage({
        message:"Note created successfully",
        type:"success"
      })
      navigation.goBack()
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{marginHorizontal:20 ,flex: 1}}>
      <Input placeholder="Title" onChangeText={(text)=>setTitle(text)}/>
      <Input placeholder="Description" multiline={true} onChangeText={(text)=>setDescription(text)} />
      <View style={{marginTop:25, marginBottom:15}}>
        <Text>Select your note color:</Text>
      </View>

      {
        noteColorOptions.map((option,index) =>{
          const selected = option === noteColor;
          return (
            <Pressable onPress={()=>setNoteColor(option)} key={index} style={styles.radioContainer}>
            <View style={[styles.outerCircle, selected && {borderColor:option}]}>
              <View style={[styles.innerCircle, selected && {backgroundColor:option, borderColor:option}]}></View>
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </Pressable>
          )
        })
      }
      {
        loading ?
        <ActivityIndicator></ActivityIndicator>
        :
        <Button onPress={onPressCreate}  title={"Submit"} customStyles={{alignSelf:"center", marginBottom:60, marginTop:60, width:'100%'}} />
      }
      
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