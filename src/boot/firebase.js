import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD06aY2OjcusNClseRKYxJGX0E_AHIkpoE',
  authDomain: 'qwitter-dev.firebaseapp.com',
  projectId: 'qwitter-dev',
  storageBucket: 'qwitter-dev.appspot.com',
  messagingSenderId: '813269491975',
  appId: '1:813269491975:web:ce7340649f58553ff4e5a2',
};

// === Init Firebase App connection to backend
const fb = firebase.initializeApp(firebaseConfig);

// === Init Services
// Initialize Authentication Service
const auth = firebase.auth();

// Initialize Firestore Service
// NOTE It's this that allows us to interact with our Firestore
// to add documents, retrieve collections, etc.
const db = firebase.firestore(fb);

// Initialize Firebase Storage Service
//const storage = firebase.storage();

// Initialize Functions Service
//const functions = firebase.functions();

// === Timestamp
// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
const timestamp =
  firebase.firestore.FieldValue.serverTimestamp; /* eslint-disable-line */

export { fb, auth, db, timestamp };
