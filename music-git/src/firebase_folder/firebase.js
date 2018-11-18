import firebase from 'firebase';

// Web setup:
const config = {
    apiKey: "AIzaSyCX2WAh7VOidxIkWXKReHXsCrG-oxfpYfg",
    authDomain: "music-1597.firebaseapp.com",
    databaseURL: "https://music-1597.firebaseio.com",
    projectId: "music-1597",
    storageBucket: "music-1597.appspot.com",
    messagingSenderId: "731007427562"

    };

const app_initializer = firebase.initializeApp(config); //initialize the firebase app by its config.
//to provide firebase authentication.
const db = firebase.database(); //to send/retreive data from db
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider(); //to provide fb auth.

const storage = firebase.storage().ref(); //for using storage for images
export {facebookAuthProvider,app_initializer};

const auth = firebase.auth();
//For traveller
export {
    db,
    auth,
    storage,
};
