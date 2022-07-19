import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Edit from './src/screens/edit';
import Create from './src/screens/create';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import FlashMessage from 'react-native-flash-message';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyBRa2FztU-l68ZI2PvC0OWfPySGfJXib10',
  authDomain: 'note-app-acc-21ac1.firebaseapp.com',
  projectId: 'note-app-acc-21ac1',
  storageBucket: 'note-app-acc-21ac1.appspot.com',
  messagingSenderId: '615108254541',
  appId: '1:615108254541:web:df6c7d5e9b2bf710767504',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   signOut(auth);
  // }, []);

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return authSubscription;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Edit">
              {(props) => <Edit {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" /> {/* <--- here as last component */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
