// DB Object
const dbInit = () =>{
    const firebaseConfig = {
        apiKey: "AIzaSyABl9b4I7l6G7nh6DjRsq3INJ5bz4pq4cI",
        authDomain: "patient-tracker-app-47a93.firebaseapp.com",
        databaseURL: "https://patient-tracker-app-47a93.firebaseio.com",
        projectId: "patient-tracker-app-47a93",
        storageBucket: "patient-tracker-app-47a93.appspot.com",
        messagingSenderId: "619173925296",
        appId: "1:619173925296:web:f7fe9e038b2aa37e01c675",
        measurementId: "G-K22HT59B50"
      };
      firebase.initializeApp(firebaseConfig);
}
dbInit()
// Initilaize db variable
const db = firebase.database();