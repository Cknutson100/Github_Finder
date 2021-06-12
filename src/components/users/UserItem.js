import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


// This is the same as below: function UserItems () {...}
const UserItem = (props) => {
    // Alternatively you could destructure like this:
    // const UserItem = ({user: { login, avatar_url, html_url }}) => {...}
    // you would then remove your line 8
    const { login, avatar_url, html_url} = props.user; // <--- Pulls the destructured values from the prop user that we generated in the Users.js
    return (
        <div className='card text-center'>
            <img src={avatar_url} alt="#" className="round-img" style={{ width:'60px'}}/>
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
        </div>
    )
}

    // This is another option for how to declare state. Constructors will run when components are called.
    // constructor(){
    //     super();
    //     this.state = {
    //         id: 'id',
    //         login: 'mojombo',
    //         avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //         html_url: 'https://github.com/mojombo'
    //     }
    // }
    // state = {
    //             id: 'id',
    //             login: 'mojombo',
    //             avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    //             html_url: 'https://github.com/mojombo'
    //         }


UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem
