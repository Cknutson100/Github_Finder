import React from 'react'
import UserItem from './UserItem'  // <--- This is how we can create the UserItem tag below.
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

const Users = ({ users, loading}) => {
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

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}
export default Users
