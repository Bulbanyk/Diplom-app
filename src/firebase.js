import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";



const firebaseConfig = {
    apiKey: "AIzaSyASx-9W47nbpdX-lYt3MXh4--74V3zbJbs",
    authDomain: "diplombulat.firebaseapp.com",
    projectId: "diplombulat",
    storageBucket: "diplombulat.appspot.com",
    messagingSenderId: "968744892053",
    appId: "1:968744892053:web:74887b59f84674074f8d9c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9098");
    connectFirestoreEmulator(db, "localhost", 8082);
    connectFunctionsEmulator(fbFunctions, "localhost", 5002);
}
