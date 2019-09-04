import {combineReducers} from 'redux';
import {login} from './signupReducers'
let allReducers = combineReducers({login});
export default allReducers;