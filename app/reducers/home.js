import * as types from '../actions/types';
const initialState = {
    mode: ''
};

export default function home(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHANGE_MODE:
            return {
                ...state,
                mode: action.mode
            }
            break;
        default:
            return state;
    }
}