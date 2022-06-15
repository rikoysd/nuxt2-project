import { initializeApp } from "firebase/app";
// firebaseをimport
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-I6sA_z68o07VzNpcbQmFcmNnh6UPLsE",
  authDomain: "nuxt-project-76513.firebaseapp.com",
  projectId: "nuxt-project-76513",
  storageBucket: "nuxt-project-76513.appspot.com",
  messagingSenderId: "70902189215",
  appId: "1:70902189215:web:bd87c339a3b8ea6934e6aa",
};

const firebase = initializeApp(firebaseConfig);
// const db = getFirestore(firebase);

// export default db;
export default firebase;
