/* globals FIREBASE_KEY FIREBASE_ID */
import * as firebase from 'firebase'

const config = {
  apiKey: FIREBASE_KEY,
  authDomain: `${FIREBASE_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_ID}.firebaseio.com`,
  projectId: FIREBASE_ID,
  storageBucket: `${FIREBASE_ID}.appspot.com`
}

firebase.initializeApp(config)

export default firebase
