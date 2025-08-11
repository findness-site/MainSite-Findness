// src/data/firebase/firebaseClient.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCSf9w-DAgKsgMIM0cL99Z4yzYOqCzsEY",
  authDomain: "findness-site-fb.firebaseapp.com",
  databaseURL: "https://findness-site-fb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "findness-site-fb",
  storageBucket: "findness-site-fb.firebasestorage.app",
  messagingSenderId: "837782245681",
  appId: "1:837782245681:web:03eddc68bc8ceb1bb7a010",
  measurementId: "G-5K6QS3PJ0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service and export it for use in other files
export const db = getDatabase(app);