import {SET_TITLE,RECEIVE_USER,ERROR_MSG,RESET_USER} from './action-types'
import {combineReducers} from "redux";
import storageUtils from "../utils/storageUtils";

const initUser=storageUtils.getUser()
function user(state=initUser,action) {
    switch (action.type) {
        case RESET_USER:
            return {}
        case RECEIVE_USER:
            return action.data
        case ERROR_MSG:
            return {...state,msg:action.data}
        default:
            return state
    }
}

const initHeadTitle=''
function headTitle(state=initHeadTitle,action) {
    switch (action.type) {
        case SET_TITLE:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    user,headTitle
})