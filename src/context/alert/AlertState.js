import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import {
    SET_ALERT, REMOVE_ALERT

} from '../types';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(alertReducer, initialState);


    // Set Alert:
        const setAlert = (msg, type) => { 
            dispatch({
               type: SET_ALERT,
               payload: {msg,type} 
            });

            setTimeout(() => dispatch({ type: REMOVE_ALERT }) , 4000 );
          };

    return (
        <alertContext.Provider
        value={{
            alert: state,
            setAlert,
        }}
        // props.children will display whatever you include between the opening
        // and closing tags when invoking a component.
        // so its basically a catch all for a given component.
        // when this component is called in App.js props.children will ensure that
        // all the children of that component are displayed properly.
        >
            {props.children}
        </alertContext.Provider>
    );
};

export default AlertState;