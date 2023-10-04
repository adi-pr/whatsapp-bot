const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "whatsapp-web-bot-309f4.firebaseapp.com",
  projectId: "whatsapp-web-bot-309f4",
  storageBucket: "whatsapp-web-bot-309f4.appspot.com",
  messagingSenderId: "1037636923313",
  appId: "1:1037636923313:web:141214373e5e21b5931790",
  measurementId: "G-YFLVYP19JF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;