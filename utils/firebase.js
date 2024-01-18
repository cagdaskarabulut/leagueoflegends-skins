//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";


const firebaseConfig = {
  projectId: "leagueoflegends-skins-firebase",
  storageBucket: "leagueoflegends-skins-firebase.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  measurementId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);