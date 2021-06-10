import {combineReducers} from 'redux'
import citiesReducer from './citiesReducer'
import itinerariesReducer from './itinerariesReducer'
import userReducer from './userReducer'
const rootReducer = combineReducers({
    citiesReducer: citiesReducer,
    itinerariesReducer: itinerariesReducer,
    userReducer: userReducer
})
export default rootReducer