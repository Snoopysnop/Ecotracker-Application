import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import { ipAddress } from '../../config';

const LoginScreen = () => {
  const [pseudo, setPseudo] = useState('')
	const navigation = useNavigation()


	const handleRegister = () => {

        auth.currentUser.updateProfile({displayName: pseudo}).then(async () => {
            // POST request to create user
            var headers = new Headers();
            headers.append("Content-Type", "application/json");

            let postOptions = {
                method: 'POST',
                headers: headers,
                body: pseudo,
            };

            await fetch('http://' + ipAddress + ':8080/user/create', postOptions)
                .then(response => console.log("User registered"))
                    // TODO : if response is 409 display that pseudo is non avaible
                    // TODO : accept registering only if response is 200
                .catch((error) => {
                    console.error(error);
                })

      //Creation date au moment du login
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

      navigation.replace("Tabs",{
        user: {
          pseudo:auth.currentUser.displayName,
          creationDate:auth.currentUser.creationDate=formattedDate,
          profilePicture:"https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
        },
      })
    });
  }

	return (
		 <View
      style={styles.container}
    >
	
	  <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Rentre ton pseudo</Text>
		<Text style={styles.headerText2}>Afin de draguer des femmes</Text>
		<Text style={styles.headerText2}>en tout anonyma ! héhéhhé mathis à pas vu ces texte issous</Text>
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