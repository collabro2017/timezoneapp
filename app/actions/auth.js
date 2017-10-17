import * as types from './types'
import * as emailAuth from '../data/firebase'
import firebase, {firebaseDb} from '../data/firebaseconf'

const savePersonalData = async function(data, callback) {
    const uid = firebase.auth().currentUser.uid
    const profilePath = `users/${uid}`
    const profileData = {...data}

    const userRef = firebaseDb.child(profilePath)
    await userRef.update(profileData, callback)
}

const getUserRole = async function () {
    const uid = firebase.auth().currentUser.uid
    const profilePath = `users/${uid}`
    const userRef = firebaseDb.child(profilePath)
    userRef.once('value').then(function(snapshot) {
       var role = (snapshot.val() && snapshot.val().role);
       return role;   
    })  
}

export const signUp = (email, pass, name, role, isNormal) => {
    return async(dispatch) => {
        if (isNormal === 'normal') {
            dispatch({
                type: types.SIGN_UP
            })
        }
        if (isNormal === 'abnormal') {
            dispatch({
                type: types.ADD_NEW_USER
            })
        }

        try {
            await emailAuth.signUp(email, pass, name, role)
            await savePersonalData({
                name: name,
                email: email,
                role: role
            })
            if (isNormal === 'normal') {
                const uid = firebase.auth().currentUser.uid
                dispatch(logInSuccess('email', email, role, uid))
            }
            if (isNormal === 'abnormal') {
                dispatch({type: types.ADD_NEW_USER_SUCCESS})
            }
                
        } catch(err) {
            alert(err)
            if (isNormal === 'normal') {
                dispatch(signUpFailure(err))
            }
            if (isNormal === 'abnormal') {
                dispatch({type: types.ADD_NEW_USER_FAILURE})
            }
        }
    }
}

export const logIn = (email, pass) => {
    let role = '';
    return async(dispatch) => {
        dispatch({type: types.LOG_IN})
        try {
            await emailAuth.logIn(email, pass)
            const uid = firebase.auth().currentUser.uid
            const profilePath = `users/${uid}`
            const userRef = firebaseDb.child(profilePath)
            userRef.once('value').then(function(snapshot) {
                if (snapshot.val()) {
                    dispatch(logInSuccess('email', email, snapshot.val().role, uid))
                }
                else {
                    alert("There is no user record corresponding to this identifier. The user may have been deleted.");
                    dispatch(logInFailure(''));
                }  
            }) 
        } catch(err) {
            alert(err)
            dispatch(logInFailure(err))
        }
    }
}

export const logOut = () => {
    return async(dispatch) => {
        dispatch({type: types.LOG_OUT})
    }
}

export const signUpFailure = (err) => ({
    type: types.SIGN_UP_FAILURE,
    err,
})

export const logInSuccess = (method, email, role, uid) => {
    return dispatch => {
        dispatch({
            type: types.LOG_IN_SUCCESS,
            uid,
            method,
            email,
            role
        })
    }
}

export const logInFailure = (err) => ({
    type: types.LOG_IN_FAILURE,
    err,
})

