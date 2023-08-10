
import { initializeApp } from 'firebase/app';
import {FieldValue,addDoc, getFirestore,getDocs, collectionGroup, collection } from 'firebase/firestore';
import {getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

const firebaseConfig = {
  // Your Firebase configuration object
  apiKey: "AIzaSyCOswJ_C0KhbEl0Cg8yTxzEJVhVoh-O_7o",
  authDomain: "reactnative-ig-clone-2ab15.firebaseapp.com",
  projectId: "reactnative-ig-clone-2ab15",
  storageBucket: "reactnative-ig-clone-2ab15.appspot.com",
  messagingSenderId: "331190447584",
  appId: "1:331190447584:web:1065058d7a7f2e8c444f85",
  measurementId: "G-2V83N9GRQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth= getAuth(app)
 
export {app,db,auth,signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword,
   getDocs,addDoc, collectionGroup,FieldValue, collection}

