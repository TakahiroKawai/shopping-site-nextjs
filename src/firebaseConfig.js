import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeSi9qmAdiG8TPwTG1IObpoGmVHKNuRZE",
  authDomain: "shopping-site-nextjs.firebaseapp.com",
  projectId: "shopping-site-nextjs",
  storageBucket: "shopping-site-nextjs.firebasestorage.app",
  messagingSenderId: "82591396891",
  appId: "1:82591396891:web:2a742f6b9f735b47c3f4be"
};

export const firebaseApp = initializeApp(firebaseConfig);