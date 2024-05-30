// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDpWPFefbIVB8MhRM_jG3tc9s3dZpVPBzs",
  authDomain: "news-ea1f2.firebaseapp.com",
  projectId: "news-ea1f2",
  storageBucket: "news-ea1f2.appspot.com",
  messagingSenderId: "296510906410",
  appId: "1:296510906410:web:b4dbab1426a5c4b6ffe353",
  measurementId: "G-RGXTEH0R08"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;