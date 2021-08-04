import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDknL-XIpgyab0j49aav4wq5q4CAek_6gI",
  authDomain: "react-blog-app-916a9.firebaseapp.com",
  projectId: "react-blog-app-916a9",
  storageBucket: "react-blog-app-916a9.appspot.com",
  messagingSenderId: "1008855399568",
  appId: "1:1008855399568:web:5f9c1fb8309ca5d3062c15",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
  }
}

const fire = firebase;
export default fire;
