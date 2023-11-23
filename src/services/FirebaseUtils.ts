// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "routify-be2cf.firebaseapp.com",
    projectId: "routify-be2cf",
    storageBucket: "routify-be2cf.appspot.com",
    messagingSenderId: "308509363226",
    appId: "1:308509363226:web:2a0eb0eb113152d01555a3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const databaseFirestore = getFirestore(app);
const firebaseAuth = getAuth()

export {
    databaseFirestore,
    firebaseAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
}