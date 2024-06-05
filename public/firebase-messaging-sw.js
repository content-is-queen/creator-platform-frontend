importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyD39POhaQabj3aSQJPXLi-uW3bA4qECmZE",
  authDomain: "contentisqueen-97ae5.firebaseapp.com",
  projectId: "contentisqueen-97ae5",
  storageBucket: "contentisqueen-97ae5.appspot.com",
  messagingSenderId: "126138379488",
  appId: "1:126138379488:web:d694e99b7d1b6ab25c7485",
  measurementId: "G-EXZ7HVTWR0",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
