import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYSWoSGrNmLUIkmavfjbXH8ThZ7y2BTBM",
  authDomain: "movie-ticket-booking-app-f9181.firebaseapp.com",
  projectId: "movie-ticket-booking-app-f9181",
  storageBucket: "movie-ticket-booking-app-f9181.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "175304407976",
  appId: "1:175304407976:web:17b118ec4f746c9c847b9d",
  measurementId: "G-8QNL9F76BP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Enable Persistent Login
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling persistence:", error);
  });

export { app, auth, analytics, storage };


