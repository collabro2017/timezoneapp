import * as types from '../actions/types';
const initialState = {
    UsersList: {},
    isFetchingUsers: false,
    isSavingUser: false,
    isSavedUser: false,
    isAddingNewUser: false,
    isAddedNewUser: false
};

export default function manager(state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCHING_USERS :
            return {
                ...state,
                isFetchingUsers: true
            }
            break;
        case types.FETCH_USERS_SUCCESS: 
            return {
                ...state,
                UsersList: action.UsersList,
                isFetchingUsers: false
            } 
            break;
        case types.SAVE_USER :
            return {
                ...state,
                isSavingUser: true,
                isSavedUser: false
            }
            break;
        case types.SAVE_USER_SUCCESS :
            return {
                ...state,
                isSavingUser: false,
                isSavedUser: true,
            }
            break;
        case types.SAVE_USER_FAILURE :
            return {
                ...state,
                isSavingUser: false,
            }
            break;
        case types.ADD_NEW_USER :
            return {
                ...state,
                isAddingNewUser: true,
                isAddedNewUser: false
            }
            break;
        case types.ADD_NEW_USER_SUCCESS :
            return {
                ...state,
                isAddingNewUser: false,
                isAddedNewUser: true
            }
            break;
        case types.ADD_NEW_USER_FAILURE :
            return {
                ...state,
                isAddingNewUser: false,
            }
            break;
        default:
            return state;
    }
}