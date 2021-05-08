import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBmgyzT21hqjbLVG8m8KSND4WrfwaipK4",
  authDomain: "community-record-club.firebaseapp.com",
  projectId: "community-record-club",
  storageBucket: "community-record-club.appspot.com",
  messagingSenderId: `126325256643`,
  appId: "1:126325256643:web:ab95025ef44180a5df8d76",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

export { firebaseApp, auth };
export default db;
