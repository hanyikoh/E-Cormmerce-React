import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider)

export const handleUserProfile = async ({userAuth, additionalData}) => {
    console.log("userAuth", userAuth)
    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`)
    //it will return a user reference on the document uid
    //so now the userRef is referring to the document
    const snapshot = await userRef.get();
    console.log("Snapshot SAY HI",snapshot)
    if (!snapshot.exists) {
        console.log("USER NOT EXIST")
        const { displayName, email } = userAuth;
        const timestamp = new Date();
        const userRoles = ['user'];

        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                userRoles,
                ...additionalData
            })
        } catch (err) {
            console.log(err)
        }
    }
    return userRef;
    //return userRef to update the local state of the application
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            //onAuthStateChanged returns a function which we can use to subscribe or unsubscribe
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
}