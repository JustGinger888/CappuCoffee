import firebase from "firebase";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrgJbzzHCjckRWKHB2zm9srej49rkBTDQ",
  authDomain: "cappucoffee-40101.firebaseapp.com",
  databaseURL: "https://cappucoffee-40101.firebaseio.com",
  projectId: "cappucoffee-40101",
  storageBucket: "cappucoffee-40101.appspot.com",
  messagingSenderId: "160635773289",
  appId: "1:160635773289:web:db7bd07425422a3da61df8",
  measurementId: "G-KWFHG206RY"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
