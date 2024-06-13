importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD39POhaQabj3aSQJPXLi-uW3bA4qECmZE",
  authDomain: "contentisqueen-97ae5.firebaseapp.com",
  projectId: "contentisqueen-97ae5",
  storageBucket: "contentisqueen-97ae5.appspot.com",
  messagingSenderId: "126138379488",
  appId: "1:126138379488:web:d694e99b7d1b6ab25c7485",
  measurementId: "G-EXZ7HVTWR0"
});

const messaging = firebase.messaging();
