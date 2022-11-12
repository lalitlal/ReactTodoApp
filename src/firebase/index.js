import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDCdaaayHTq0sTnX3K-nRorH4uDyRJcqQ",
  authDomain: "todo-app-7d6f3.firebaseapp.com",
  projectId: "todo-app-7d6f3",
  storageBucket: "todo-app-7d6f3.appspot.com",
  messagingSenderId: "468101794087",
  appId: "1:468101794087:web:a8aaa87570a593d43c4102",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export default { app, db };
