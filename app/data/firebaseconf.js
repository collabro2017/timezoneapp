import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDFcOnLW6cpGsVKYTfpV1UzvGDanaoliZs",
    authDomain: "timezoneproject-2a330.firebaseapp.com",
    databaseURL: "https://timezoneproject-2a330.firebaseio.com",
    projectId: "timezoneproject-2a330",
    storageBucket: "timezoneproject-2a330.appspot.com",
    messagingSenderId: "260220486950"
}

export default firebase

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firebaseDb = firebaseApp.database().ref()

export const firebaseStorage = firebaseApp.storage()
