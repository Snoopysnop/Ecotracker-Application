// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu5oMUvdcwJbj6LtJuJEQTXar5vzV9ePM",
  authDomain: "echotrackerauth.firebaseapp.com",
  projectId: "echotrackerauth",
  storageBucket: "echotrackerauth.appspot.com",
  messagingSenderId: "404352384046",
  appId: "1:404352384046:web:6f5704f31a1937927e33bf"
};



// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };