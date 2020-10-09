import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false,
    user: null
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_LOGIN_STARTED:{
            return{
                ...state,
                loading: true,
                error: null

            }
        }
        case actionTypes.AUTH_LOGIN_FAIL:
            return{
                ...state,
                error: action.err,
                loading: false


            }
        case actionTypes.AUTH_LOGIN_SUCCESS:
            return{
                ...state,
                token: action.token,
                user: action.user,
                error: null,
                loading: false
            }
        case actionTypes.AUTH_LOGIN_LOGOUT:
            return{
                ...state,
                token: null,
                error: null,
                loading: false,
                user: null
            }
        default: return state
    }
}

export default reducer