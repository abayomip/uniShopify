import { getApp,getApps, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth,getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

let firebaseApp;
export const getFirebaseApp = () => {
  if(firebaseApp){
    return firebaseApp
  }

const firebaseConfig = {
  apiKey: "AIzaSyBg_EoMRcr_lC_ZA4-gIo9K-zg-MUZ7UK4",
  authDomain: "unishopify-b1e33.firebaseapp.com",
  projectId: "unishopify-b1e33",
  storageBucket: "unishopify-b1e33.appspot.com",
  messagingSenderId: "507040572088",
  appId: "1:507040572088:web:a5dd413d16d3072e300a4d",
  measurementId: "G-5X50Y1DLDX"
};
//checking if there is any firebase apps initialized.
const app =getApps().length ==0 ? 
initializeApp(firebaseConfig) : getApp();
// initialize firebase auth with ReactNativePersistence
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
firebaseApp = app;
return app;
}

// this function helps to get the firestore instance 
export const getFirestoreInstance = () => {
  //check to use getFirestoreInstance not getFirestore(app) in the authAction 
  const app = getFirebaseApp();
  return getFirestore(app);
};
export const getStorageInstance = () => {
  const app = getFirebaseApp();
  return getStorage(app);
};