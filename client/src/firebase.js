import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqLCGlGWwUYgimozgA1Av0lVW09_DSd-I",
  authDomain: "abhi-blog-3fcb5.firebaseapp.com",
  projectId: "abhi-blog-3fcb5",
  storageBucket: "abhi-blog-3fcb5.appspot.com",
  messagingSenderId: "595623143678",
  appId: "1:595623143678:web:816c02a9ad0ff7e7de9daf",
  measurementId: "G-2HYVK5FC3H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
