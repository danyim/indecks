import firebase from "firebase";

console.log(process.env.REACT_APP_FIREBASE_KEY);
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_ID}.appspot.com`
};

export const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export default firebase;
