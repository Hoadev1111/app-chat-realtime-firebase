import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDIxGAFmAx4j-9TbeCffVI1OAUPZkeAO6I",
    authDomain: "chat-9fafe.firebaseapp.com",
    projectId: "chat-9fafe",
    storageBucket: "chat-9fafe.appspot.com",
    messagingSenderId: "887190398455",
    appId: "1:887190398455:web:8bf7c8e4a7d8d620b87af2",
};


// initialize firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
