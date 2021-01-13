import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJCR_Vejg4Ojc3Yf9Lr5g974VPT6wAzQ4",
    authDomain: "product-7e07d.firebaseapp.com",
    databaseURL: "https://product-7e07d.firebaseio.com",
    projectId: "product-7e07d",
    storageBucket: "product-7e07d.appspot.com",
    messagingSenderId: "242223861817",
    appId: "1:242223861817:web:2ddab536fdf617cd787de8",
    measurementId: "G-QL1MJ04YTL",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
