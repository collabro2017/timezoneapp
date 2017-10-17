import * as types from '../actions/types';
const initialState = {
    isAddingNewTimezone: false,
    isAddedNewTimezone: false,
    TimezonesList: [],
    isFetchingTimezones: false,
    isFetchingTimezones1: false,
    isSavingTimezone: false,
    isSavedTimezone: false,
};

export default function regular(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_NEW_TIMEZONE:
            return {
                ...state,
                isAddingNewTimezone: true,
                isAddedNewTimezone: false
            }
            break;
        case types.ADD_NEW_TIMEZONE_SUCCESS:
            return {
                ...state,
                isAddingNewTimezone: false,
                isAddedNewTimezone: true
            }
            break;
        case types.ADD_NEW_TIMEZONE_FAILURE:
            return {
                ...state,
                isAddingNewTimezone: false,
            }
            break; 
        case types.FETCHING_TIMEZONES :
            return {
                ...state,
                isFetchingTimezones: true
            }
            break;
        case types.FETCH_TIMEZONES_SUCCESS: 
            return {
                ...state,
                TimezonesList: action.TimezonesList,
                isFetchingTimezones: false
            } 
            break;
        case types.SAVE_USER :
            return {
                ...state,
                isSavingTimezone: true,
                isSavedTimezone: false
            }
            break;
        case types.SAVE_USER_SUCCESS :
            return {
                ...state,
                isSavingTimezone: false,
                isSavedTimezone: true,
            }
            break;
        case types.SAVE_USER_FAILURE :
            return {
                ...state,
                isSavingTimezone: false,
            }
            break;
            case types.SAVE_TIMEZONE :
            return {
                ...state,
                isSavingTimezone: true,
                isSavedTimezone: false
            }
            break;
        case types.SAVE_TIMEZONE_SUCCESS :
            return {
                ...state,
                isSavingTimezone: false,
                isSavedTimezone: true,
            }
            break;
        case types.SAVE_TIMEZONE_FAILURE :
            return {
                ...state,
                isSavingTimezone: false,
            }
            break;     
        default:
            return state;
    }
}