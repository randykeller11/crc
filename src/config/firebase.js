import firebase from "firebase";

const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_PROJECTID,
  REACT_APP_FIREBASE_STORAGEBUCKET,
  REACT_APP_FIREBASE_MESSAGINGSENDERID,
  REACT_APP_FIREBASE_APPID,
} = process.env;

const firebaseConfig = {
  apiKey: `${REACT_APP_FIREBASE_APIKEY}`,
  authDomain: `${REACT_APP_FIREBASE_AUTHDOMAIN}`,
  projectId: `${REACT_APP_FIREBASE_PROJECTID}`,
  storageBucket: `${REACT_APP_FIREBASE_STORAGEBUCKET}`,
  messagingSenderId: `${REACT_APP_FIREBASE_MESSAGINGSENDERID}`,
  appId: `${REACT_APP_FIREBASE_APPID}`,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
