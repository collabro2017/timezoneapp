import {firebaseApp} from './firebaseconf'
import { Actions, Router, Scene } from 'react-native-router-flux';
import firebase, {firebaseDb} from '../data/firebaseconf'

export const signUp = (email, pass, name, role) => {
    return new Promise((resolve, reject) => {
        if (email !== '' && pass !== '') {
            firebaseApp.auth().createUserWithEmailAndPassword(email, pass).then(user => {
                resolve(true);
            }).catch(error => {reject(`${error.message}`); });
        } else {
            reject('missing credentials');
        }    
    });
}

export const logIn = (email, pass) => {
    return new Promise((resolve, reject) => {
        if (email !== '' && pass !== '') {
            firebaseApp.auth().signInWithEmailAndPassword(email, pass).then(user => {
                resolve(true);
            }).catch(error => {reject(`${error.message}`);});
        } else {
            reject('missing credentials')
        }
    });
}
