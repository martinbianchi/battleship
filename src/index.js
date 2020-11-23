import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';
import firebase from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQZ50USvUY702JRNcm3el84dM6pnXLxwk",
  authDomain: "pappa-battleship.firebaseapp.com",
  databaseURL: "https://pappa-battleship.firebaseio.com",
  projectId: "pappa-battleship",
  storageBucket: "pappa-battleship.appspot.com",
  messagingSenderId: "794774112549",
  appId: "1:794774112549:web:4f3a4a3bbd7a88c592f2cc",
  measurementId: "G-1E7FSGF2E4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
