import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import { ipAddress } from '../../config';
import {Alert ,Image} from 'react-native';

const LoginScreen = ({route}) => {
  const [pseudo, setPseudo] = useState('')
  const navigation = useNavigation()





  const handleRegister = async () => {
      // POST request to create user
      var headers = new Headers();
      headers.append("Content-Type", "application/json");

      let postOptions = {
        method: 'POST',
        headers: headers,
        body: pseudo,
      };

      await fetch('http://' + ipAddress + ':8080/user/create', postOptions)
        .then(response => {
            if(response.ok){
                console.log("user registered",route)
                auth
                .createUserWithEmailAndPassword(route.params.email, route.params.password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log('Registered with:', user.email);
                    auth.currentUser.updateProfile({
                        displayName: pseudo,
                        photoURL: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                      }).then(() => {
                        navigation.replace("Tabs")
                      });
                })
                .catch(error => alert(error.message))
                
             }

             else{
                if(response.status == 409) {
                    Alert.alert('Pseudo already taken','Please choose another');
                }
                else{
                    Alert.alert('Error while registering','Please retry');
                }
                //Whatever stay in register screen
                navigation.replace("Register",{email:route.params.email, password:route.params.password})
             }
        })
        .catch((error) => {
            console.error(error);
        })
  }

  return (
    <View
      style={styles.container}
    >

      <View style={styles.headerContainer}>
      <Image source={require('../../assets/favicon.png')}
      resizeMode='contain'
      style={{
        width: 200,
        height: 200
        ,
    }}>
      </Image>
        <Text style={styles.headerText}>Enter a username</Text>
      </View>

      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Pseudo"
          value={pseudo}
          onChangeText={text => setPseudo(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegister}
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