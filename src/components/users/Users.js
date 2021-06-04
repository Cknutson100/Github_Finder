import React, { Component } from 'react'
import UserItem from './UserItem'  // <--- This is how we can create the UserItem tag below.

class Users extends Component {
    state = {
        users: [
            {
                id: '1',
                login: 'mojombo',
                avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
                html_url: 'https://github.com/mojombo',
            },
            {
                id: '2',
                login: 'defunkt',
                avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
                html_url: 'https://github.com/defunkt',
            },
            {
                id: '3',
                login: 'pjhyett',
                avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
                html_url: 'https://github.com/pjhyett',
            }
        ]
    }
    render() {
        const {users, id, avatar_url, html_url, login} = this.state // <--- More destructuring.
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} /> // <--- Using this tag sends it to UserItem component
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1f)',
    gridGap: '1rem'
}

export default Users
