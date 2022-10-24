import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATp0sV2OslW5J0lHvVS_FURUXQiBiuESU",
  authDomain: "chave-roda-815d0.firebaseapp.com",
  projectId: "chave-roda-815d0",
  storageBucket: "chave-roda-815d0.appspot.com",
  messagingSenderId: "258179667269",
  appId: "1:258179667269:web:14ff1bdf56bd2664e89a2c"
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };