import *as types from './types';

export const changeMode = (mode) => {
    return async (dispatch, store) => {
        dispatch({type: types.CHANGE_MODE, mode: mode})
    }
}
    
