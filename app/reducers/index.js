import { combineReducers } from 'redux'
import homeReducer from './home'
import authReducer from './auth'
import regularReducer from './regular'
import managerReducer from './manager'

export default combineReducers({
    home: homeReducer,
    auth: authReducer,
    regular: regularReducer,
    manager: managerReducer
});