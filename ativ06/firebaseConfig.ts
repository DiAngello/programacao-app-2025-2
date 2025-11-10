import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtp8A-4-wne9vOP79T4v3-YRNnowop91c",
  authDomain: "ativ06.firebaseapp.com",
  projectId: "ativ06",
  storageBucket: "ativ06.firebasestorage.app",
  messagingSenderId: "825959881519",
  appId: "1:825959881519:web:c08f0447b745711ffc5fda"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
