import * as types from './types'
import * as emailAuth from '../data/firebase'
import firebase, {firebaseDb} from '../data/firebaseconf'

let flag = false;
let index = '';
const saveUserData = async function(data, callback) {
    const dataPath = `users/`
    const userData = {...data}
    const userRef = firebaseDb.child(dataPath)
    
    await userRef.push(userData, callback)
}

const updateUserData = async function(data, callback) {
    let path = 'users/' + index;
    const userData = {...data}
    await firebase.database().ref(path).update(userData, callback)
}

const deleteUserData = async function(userIndex) {
    let path = 'users/' + userIndex;
    firebase.database().ref(path).on('value', snapshot => {
        if (snapshot.val()) {
            snapshot.ref.remove();
        }   
    })
}

export const fetchAllUsersData = (role) => {
    return async (dispatch) => {
        dispatch({
            type: types.FETCHING_USERS
        })
        var usersRef = firebase.database().ref('users/');
        if (role === 'Manager') {
            usersRef.orderByChild("role").equalTo('Regular').on("value", snapshot => {
                let UsersList = snapshot.val();
                dispatch({type: types.FETCH_USERS_SUCCESS, UsersList: UsersList})  
            })
        }
        else if (role === 'Admin') {
            usersRef.on('value', snapshot => {
                let UsersList = snapshot.val();
                dispatch({type: types.FETCH_USERS_SUCCESS, UsersList: UsersList})
            })        
        }    
    }
}

export const saveUser = (userIndex, userName, userRole, userEmail) => {
    index = userIndex;
    return async(dispatch) => {
        dispatch({
            type: types.SAVE_USER
        })
        try {
            await updateUserData({
                email: userEmail,
                name: userName,
                role: userRole
            })
            dispatch({
                type: types.SAVE_USER_SUCCESS
            })
        } catch(err) {
            dispatch({
                type: types.SAVE_USER_FAILURE,
                err,
            })
        }
    }
}

export const deleteUser = (userIndex) => {
    return async(dispatch) => {
        try {
            await deleteUserData(
                userIndex
            )
        } catch(err) {
        }
    }
}