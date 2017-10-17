import * as types from '../actions/types';
const initialState = {
    uid: null,
    email: null,
    role: null,
    logInMethod: null,
    isSigningIn: false,
    signInError: null,
    isSigningUp: false,
    signUpError: null,
    isLoggingIn: false,
    loggedIn: false,
};

export default function auth(state = initialState, action = {}) {
    switch (action.type) {
        case types.SIGN_UP:
            return {
                ...state,
                isSigningUp: true,
            }
            break;
        case types.SIGN_UP_ABNORMAL:
            return {
                ...state,
                isAddingUser: true,
                isAddedUser: false
            }
            break;    
        case types.LOG_IN_SUCCESS:
            return {
                ...state,
                uid: action.uid,
                email: action.email,
                role: action.role,
                logInMethod: action.method,
                isSigningUp: false,
                isLoggingIn: false,
                loggedIn: true
            }
            break;
        case types.LOG_IN:
            return {
                ...state,
                isLoggingIn: true
            }
            break;
        case types.LOG_OUT:
            return {
                ...state,
                loggedIn: false,
            }
            break;
        case types.SIGN_UP_FAILURE:
            return {
                ...state,
                uid: false,
                isSigningUp: false,
                signUpError: action.err,
            }
            break;
        case types.LOG_IN_FAILURE:
            return {
                ...state,
                uid: false,
                isLoggingIn: false,
                logInError: action.err,
            }
            break;
        default:
            return state;
    }
}