import { View, Text, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../App';
import Button from '../components/Button';
import { signOut } from 'firebase/auth';
// import { AntDesign } from '@expo/vector-icons';

export default function Home({navigation, route, user}) {
  // console.log("user --> ", user)
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const q = query(collection(db , 'notes'), where("uid" , "==", user.uid))
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) =>{
      const list =[];
      querySnapshot.forEach((doc)=>{
        list.push({...doc.data(), id:doc.id});
      })
      setNotes(list);
      setLoading(false);
    })
    return notesListenerSubscription;
  },[])

  // console.log(notes)
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }
  const renderItem=({item}) =>{
    const {title, description, color} = item;
    return (
      <Pressable style={{ backgroundColor:color, marginBottom:25, borderRadius:16, padding:15}} onPress={()=>{navigation.navigate("Edit",{item})}} >
        <Pressable 
          style={{ position:"absolute", alignSelf:"flex-end", zIndex:4 }} 
          onPress={async()=>{
            await deleteDoc(doc(db, "notes", item.id));
          }} >
            <AntDesign name="delete" size={24} color="white" />
        </Pressable>
        <Text style={{color:'white', fontSize:24}}>{title}</Text>
        <Text style={{color:'white', fontSize:18, marginTop:16}}>{description}</Text>
      </Pressable>
    )
  }

  const onPressCreate =()=>{
    navigation.navigate("Create")
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection:'row',justifyContent: 'space-between', padding:20}}>
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}><AntDesign name="pluscircleo" size={24} color="black" /></Pressable>
      </View>
      <FlatList data={notes} renderItem={renderItem} keyExtractor={(item,index)=>index} contentContainerStyle={{padding:20}} />
      <Button onPress={()=>{signOut(auth);}}  title={"Logout"} customStyles={{alignSelf:"center", marginBottom:60, marginTop:20}} />
    </SafeAreaView>
  )
}