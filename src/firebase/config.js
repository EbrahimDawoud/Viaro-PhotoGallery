import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDbUB5cIMfV4HW6W-FCchGrOkKzVZvZ8K0",
  authDomain: "auth-task-f1fc8.firebaseapp.com",
  projectId: "auth-task-f1fc8",
  storageBucket: "auth-task-f1fc8.appspot.com",
  messagingSenderId: "958350845632",
  appId: "1:958350845632:web:cbc526ee4911e673086f25"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);