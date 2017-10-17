import * as types from './types'
import * as emailAuth from '../data/firebase'
import firebase, {firebaseDb} from '../data/firebaseconf'
let flag = false;
let index = '';
const saveTimezoneData = async function(data, callback) {
    const dataPath = `timezones/`
    const timezoneData = {...data}
    const timezoneRef = firebaseDb.child(dataPath)
    
    await timezoneRef.push(timezoneData, callback)
}

const updateTimezoneData = async function(data, callback) {
    let path = 'timezones/' + index;
    const timezoneData = {...data}
    firebase.database().ref(path).update(timezoneData, callback)
}

const deleteTimezoneData = async function(timezoneIndex) {
    let path = 'timezones/' + timezoneIndex;
    firebase.database().ref(path).on('value', snapshot => {
        if (snapshot.val()) {
            snapshot.ref.remove();
        }   
    })
}

export const fetchAllTimezonesData = () => {
    return async (dispatch) => {
        dispatch({
            type: types.FETCHING_TIMEZONES
        })
        var timezoneRef = firebase.database().ref('timezones/');
        timezoneRef.on('value', snapshot => {
            let TimezonesList = snapshot.val();
            dispatch({type: types.FETCH_TIMEZONES_SUCCESS, TimezonesList: TimezonesList})
        })
    }
}

export const fetchHisTimezonesData = (email) => {
    return async (dispatch) => {
        dispatch({
            type: types.FETCHING_TIMEZONES
        })
        var timezoneRef = firebase.database().ref('timezones/');
        timezoneRef.orderByChild("email").equalTo(email).on("value", snapshot => {
            let TimezonesList = snapshot.val();
            dispatch({type: types.FETCH_TIMEZONES_SUCCESS, TimezonesList: TimezonesList})     
        })
    }
}

export const addNewTimezone = (timezoneName, city, diffToGMT, email) => {
    return async(dispatch) => {
        dispatch({
            type: types.ADD_NEW_TIMEZONE
        })
        try {
            await saveTimezoneData({
                timezone: timezoneName,
                city: city,
                diffToGMT: diffToGMT,
                email: email
            })
            dispatch({
                type: types.ADD_NEW_TIMEZONE_SUCCESS
            })
        } catch(err) {
            dispatch({
                type: types.ADD_NEW_TIMEZONE_FAILURE,
                err,
            })
        }
    }
}

export const saveTimezone = (timezoneIndex, timezoneName, city, diffToGMT, email) => {
    index = timezoneIndex;
    return async(dispatch) => {
        dispatch({
            type: types.SAVE_TIMEZONE
        })
        try {
            await updateTimezoneData({
                timezone: timezoneName,
                city: city,
                diffToGMT: diffToGMT,
                email: email
            })
            dispatch({
                type: types.SAVE_TIMEZONE_SUCCESS
            })
        } catch(err) {
            dispatch({
                type: types.SAVE_TIMEZONE_FAILURE,
                err,
            })
        }
    }
}

export const deleteTimezone = (timezoneIndex) => {
    return async(dispatch) => {
        try {
            await deleteTimezoneData(
                timezoneIndex
            )
        } catch(err) {
        }
    }
}