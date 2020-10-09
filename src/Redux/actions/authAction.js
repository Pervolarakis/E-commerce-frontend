import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authLoginSuccess = (token,user) =>{
    return{
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        token: token,
        user: user
    }
}

export const authLoginFail = (err) =>{
    return{
        type: actionTypes.AUTH_LOGIN_FAIL,
        err: err
    }
}

export const authLoginStart = () =>{

    return{
        type: actionTypes.AUTH_LOGIN_STARTED
    }
}

export const profileLogout = () =>{
    return{
        type: actionTypes.AUTH_LOGIN_LOGOUT
    }
}

export const loginInit = (email,password) =>{
    
    return dispatch=>{
        dispatch(authLoginStart())
        axios.post('http://localhost:5000/api/v1/auth/login',{"email":email,"password":password})
        .then(response=>{
            dispatch(authLoginSuccess(response.data.token, response.data.user))
        }
        )
        .catch(err=>
            dispatch(authLoginFail(err))
        )
    }
    
}

export const registerInit = (username, fname, lname, password, email) =>{
    return dispatch=>{
        dispatch(authLoginStart())
        const info ={"email":email,"password":password, "username": username, "fname": fname, "lname":lname}
        axios.post('http://localhost:5000/api/v1/auth/register',info)
        .then(response=>{
            dispatch(authLoginSuccess(response.data.token, response.data.user))
        }
        )
        .catch(err=>{
            dispatch(authLoginFail(err))
        }
            
        )
    }
}


