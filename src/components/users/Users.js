import React, { useContext } from 'react'
import UserItem from './UserItem'  // <--- This is how we can create the UserItem tag below.
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'

const Users = () => {
    const githubContext = useContext(GithubContext);

    const { loading, users, user } = githubContext;
    
    if (loading) {
        return <Spinner />
    } else {
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
};

export default Users
