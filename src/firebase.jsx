import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLUIYKfP5McDxfX8c4hoWYZeSzwJTBEJM",
  authDomain: "heka-entrega-react.firebaseapp.com",
  projectId: "heka-entrega-react",
  storageBucket: "heka-entrega-react.appspot.com",
  messagingSenderId: "840838588997",
  appId: "1:840838588997:web:c18b64aca38eb51eea512c"
};

const fireHeka = {
  apiKey: "AIzaSyCtzXKSoweSMLPej5-MbkTfQzFH719y-MM",
  authDomain: "hekaapp-23c89.firebaseapp.com",
  databaseURL: "https://hekaapp-23c89.firebaseio.com",
  projectId: "hekaapp-23c89",
  storageBucket: "hekaapp-23c89.appspot.com",
  messagingSenderId: "539740310887",
  appId: "1:539740310887:web:66f9ab535d18addeb173c2",
  measurementId: "G-47CYMPHNRM"
}

const dfb = initializeApp(fireHeka);

export const dbFirestore = getFirestore(dfb)
export const dbAuth = getAuth(dfb)