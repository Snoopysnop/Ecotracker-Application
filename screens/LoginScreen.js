import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Alert,Image } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleSignUp = () => {
    if(isValidEmail(email) && password.length ){
      navigation.replace("Register",{email:email, password:password})
    }
    else {
      Alert.alert('Email format or password invalid','Please enter a valid field');
      navigation.replace("Login")
    }
  }


  const handleLogin = async () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        auth.currentUser.reload();
        navigation.replace("Tabs")
      })
      .catch(error => alert(error.message))
  }


  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <View
      style={styles.container}
    >
      <Image source={require('../assets/favicon.png')}
      resizeMode='contain'
      style={{
        width: 200,
        height: 200
        ,
    }}>
      </Image>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome on EcoTracker</Text>
      </View>

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}



export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  headerContainer: {
    marginBottom: 20, // Ajout d'une marge en bas pour séparer du TextInput
  },
  headerText: {
    textAlign: 'center', // Centrer le texte
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    // Ajoutez d'autres styles selon vos préférences
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})