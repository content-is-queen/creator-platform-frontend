importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD39POhaQabj3aSQJPXLi-uW3bA4qECmZE",
  authDomain: "contentisqueen-97ae5.firebaseapp.com",
  projectId: "contentisqueen-97ae5",
  storageBucket: "contentisqueen-97ae5.appspot.com",
  messagingSenderId: "126138379488",
  appId: "1:126138379488:web:d694e99b7d1b6ab25c7485",
  measurementId: "G-EXZ7HVTWR0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
