import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app"s Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA462nK0oDg0h96Y0oVZQdy61KcH1hlxeo",
  authDomain: "chave-de-roda-vmas.firebaseapp.com",
  databaseURL: "https://chave-de-roda-vmas-default-rtdb.firebaseio.com",
  projectId: "chave-de-roda-vmas",
  storageBucket: "chave-de-roda-vmas.appspot.com",
  messagingSenderId: "185876852873",
  appId: "1:185876852873:web:cc24b6b2c07a132d605658"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const banco = firebase.firestore();
export { auth };
export { banco };
