
import {SET_TITLE,RECEIVE_USER,ERROR_MSG,RESET_USER} from './action-types'
import {reqLogin} from "../api";
import storageUtils from "../utils/storageUtils";

export  const setHeadTitle=(title)=>({type:SET_TITLE,data:title})

export const receiveUser=(user)=>({type:RECEIVE_USER,data:user})

export const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})

export const logout=()=>{
    storageUtils.removeUser()
    return {type:RESET_USER}
}

export const login=(user)=>{
    return async dispatch=>{
        const result= await reqLogin(user)
        if(result.status===0){
            const user=result.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
           dispatch(errorMsg(result.msg))
        }
    }
}