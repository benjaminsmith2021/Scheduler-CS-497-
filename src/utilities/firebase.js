import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import { useState, useEffect } from 'react';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAA1uhqHTl3_xQyN2dKr8QUIjjbo4PdjYM",

  authDomain: "scheduler-1dfbb.firebaseapp.com",

  databaseURL: "https://scheduler-1dfbb-default-rtdb.firebaseio.com",

  projectId: "scheduler-1dfbb",

  storageBucket: "scheduler-1dfbb.appspot.com",

  messagingSenderId: "771674780306",

  appId: "1:771674780306:web:e91994f757121a856d6c4b",

  measurementId: "${config.measurementId}"

};


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);