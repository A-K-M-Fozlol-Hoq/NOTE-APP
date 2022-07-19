import { View, Text, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../App';

export default function Home({navigation, route, user}) {
  // console.log("user --> ", user)
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    const q = query(collection(db , 'notes'), where("uid" , "==", user.uid))
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) =>{
      const list =[];
      querySnapshot.forEach((doc)=>{
        list.push(doc.data());
      })
      setNotes(list);
    })
    return notesListenerSubscription;
  },[])

  console.log(notes)

  const onPressCreate =()=>{
    navigation.navigate("Create")
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