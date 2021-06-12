import React, { Fragment, Component } from 'react'
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'


export class User extends Component {
    componentDidMount() {
        // This is taking the login from the url by using these methods that props has.
        // then we are passing it in as a prop to the .getUser function.
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
    }

    render() {
        // This pull all of these variables from this.props.user
        // where user is defined as the axios response to query after
        // we called it in the getUser fxn of App.js
        const {
            name,
            avatar_url,
            location, 
            bio,
            company,
            blog, 
            website,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
        } = this.props.user; // This has destructured the user state and created props from it

        const { loading, repos } = this.props;
        if (loading) return <Spinner />;

        return (
            <Fragment>
                <Link to='/' className='btn btn-light btn-light-border'>Back to Search</Link>
                Hireable: { ' ' }
                {hireable ? (<i className='fas fa-check text-success'></i> )
                : (<i className='fas fa-times-circle text-danger'></i>)}
                <div className="card grid-2">
                    <div className="all-center">
                        <img 
                            src={avatar_url} 
                            className='round-img' 
                            alt="#" 
                            style={{ width:'150px' }} 
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        { bio && <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                            </Fragment> }
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: </strong> {login}
                                    </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong> {company}
                                    </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: </strong> {blog}
                                    </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Pubic Gists: {public_gists}</div>
                </div>

                <Repos repos={repos}/>
            </Fragment>
        )
    }
}

export default User
