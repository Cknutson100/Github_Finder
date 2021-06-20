// Your reducers is where all the magic happens. The reducer gets called by your state through a dispatch
// In the reducer this is where the state is "copied" then changed to whatever you wanted to acheive by
// calling a particular type with a dispatch in the state.
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,

} from '../types';

export default (state, action) => {
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state, // the "..." is called a spread operator and it basically is just copying the state here.
                users: action.payload,
                loading: false // Notice that you can set Loading back to false here when you are done with returning users.
            };
        case GET_USER:
            return{
                ...state,
                user: action.payload,
                loading: false,
            }
        case CLEAR_USERS:
            return{
                ...state,
                users: [],
                loading: false
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            };
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        default: 
            return state;
    }
}