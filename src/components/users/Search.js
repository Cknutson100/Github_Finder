import React, {useState, useContext} from 'react'
import alertContext from '../../context/alert/alertContext'
import GithubContext from '../../context/github/githubContext'

// In this step of the function you are passing in props which could have been done
// with (props) but now you are destructuing in the input field of the fxn.
const Search = () => {
    //This is using the useState hook from react.
    // declare and then destructure the state(s) and create a method to change that
    // state, usually following the format of setNameofstatehere.
    // finally you set that equal to the react hook and give it a default value.
    const githubContext = useContext(GithubContext)
    const AlertContext = useContext(alertContext)
    
    const [text, setText] = useState('');

    // To have a function within a function you need const infront of stuff.
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            AlertContext.setAlert('Please enter something', 'light')
        } else {
            githubContext.searchUsers(text);
            setText('')
        }
    }

    // This dynamically changes the state that we hooked in above.
    // We no longer need to declare what state we are changing because we
    // assigned it a method when we hooked it in.
    const onChange = (e) => {
        setText(e.target.value);
    }
        return (
            <div>
                <form onSubmit={onSubmit} className='form'>
                    <input type="text" 
                    // This name is what lets the dynamic onChange function above work.
                    name='text' 
                    placeholder='Search Users...' 
                    // This assigns the value of our input to whatever the text:'' state is set to.
                    value={text}
                    // This allows us to write in our state based input field.
                    onChange={onChange}
                    />
                    <input type="submit" value="Search" className='btn btn-dark btn-block' />
                </form>
                {githubContext.users.length > 0 && (
                    <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>
                )}
                    
            </div>
        )
    }


export default Search
