import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,

} from '../types';

// This is similar to declaring state in the main App.js file its just now we are
// doing it within the context api and calling it in eventually.
const GithubState = props => {
    const initialState = {
        users: [],
        user: [],
        repos: [],
        loading: false,
    }

    // GithubState also needs to contain all of the actions that we will use to 
    // dispatch to the reducer.
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //-------------------------------------------------------------------------------
    // ACTION METHODS:

    // Search Users:
    const searchUsers = async (text) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
        // This is how you change a state's value with a REACT REDUCER and Dispatch call.
        dispatch({ 
            type: SEARCH_USERS,
            payload: res.data.items,
        })
      };

    // Get User

    // Get Repos

    // Clear Users search:
        const clearUsers = () => dispatch({ type: CLEAR_USERS});

    // Set Loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }

    // Set Alert

    //-------------------------------------------------------------------------------


    // We need to return the provider which will be used to wrap our whole application.
    // It will take a parameter, value which will be filled with the pieces of
    // state or methods or etc. that we would like available to our whole App.
    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,

        }}
    >
        {props.children}

    </GithubContext.Provider>
}
export default GithubState