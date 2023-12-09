// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCBW207F2TxdnRmZm2K_FWZ7I6RfOYEmg',
  authDomain: 'graphql-app-a3dce.firebaseapp.com',
  projectId: 'graphql-app-a3dce',
  storageBucket: 'graphql-app-a3dce.appspot.com',
  messagingSenderId: '538884337311',
  appId: '1:538884337311:web:9eae6ff7e62ca6cb32bcaa',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
