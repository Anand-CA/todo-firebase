import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDldV9UTYSqh-2Sa6rWdY1rhhnajZ8elL8",
  authDomain: "todo-7f04a.firebaseapp.com",
  projectId: "todo-7f04a",
  storageBucket: "todo-7f04a.appspot.com",
  messagingSenderId: "313960909315",
  appId: "1:313960909315:web:4c12a1060d5f12a1c41c36",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider };
