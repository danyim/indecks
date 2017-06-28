/* globals FIREBASE_KEY FIREBASE_ID */
import firebase from 'firebase'

const config = {
  apiKey: FIREBASE_KEY,
  authDomain: `${FIREBASE_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_ID}.firebaseio.com`,
  projectId: FIREBASE_ID,
  storageBucket: `${FIREBASE_ID}.appspot.com`
}

export const firebaseApp = firebase.initializeApp(config)
export const db = firebaseApp.database()
export const auth = firebaseApp.auth()
export default firebase
