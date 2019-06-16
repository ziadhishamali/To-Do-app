import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBztcvOFLMSG33ZTU3j7Pwf84o8Va2AKyg",
    authDomain: "ziadhishamali-todoapp.firebaseapp.com",
    databaseURL: "https://ziadhishamali-todoapp.firebaseio.com",
    projectId: "ziadhishamali-todoapp",
    storageBucket: "ziadhishamali-todoapp.appspot.com",
    messagingSenderId: "690025470003",
    appId: "1:690025470003:web:6562c35036131997"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;