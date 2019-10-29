import firebase from 'firebase/app';
require('firebase/database');

const config = {
  apiKey: 'AIzaSyBpX_Zkbk4I7Tj5jVtruHYC9NLTkIsG0sw',
  authDomain: 'capstone-web-firebase.firebaseapp.com',
  databaseURL: 'https://capstone-web-firebase.firebaseio.com',
  projectId: 'capstone-web-firebase',
  storageBucket: 'capstone-web-firebase.appspot.com',
  messagingSenderId: '959966253264',
  appId: '1:959966253264:web:8f1077a9c348116bf04ed5',
  measurementId: 'G-VRJFX2PYZ7'
};

firebase.initializeApp(config);

export const firebaseObj = firebase;
