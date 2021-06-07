import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {

    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: ''});
    }

    onChange = (e) => {
        // this will dynamically change all state based inputs in the component.
        // in this example, e.target.value will change the value of text='' in the state object above.
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { showClear, clearUsers } = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input type="text" 
                    // This name is what lets the dynamic onChange function above work.
                    name='text' 
                    placeholder='Search Users...' 
                    // This assigns the value of our input to whatever the text:'' state is set to.
                    value={this.state.text}
                    // This allows us to write in our state based input field.
                    onChange={this.onChange}
                    />
                    <input type="submit" value="Search" className='btn btn-dark btn-block' />
                </form>
                {showClear && (
                    <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>
                )}
                    
            </div>
        )
    }
}


export default Search
