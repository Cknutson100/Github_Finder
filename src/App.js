import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import User from './components/users/User.js';
import Search from './components/users/Search.js';
import AlertMe from "./components/layout/AlertMe";
import About from "./components/pages/About";
import axios from 'axios';
import GithubState from './context/github/GithubState'
import './App.css';

 const App = () => {
  // This:
   const [users, setUsers] = useState([])
   const [user, setUser] = useState({})
   const [repos, setRepos] = useState([])
   const [loading, setLoading] = useState(false)
   const [alert, setAlert] = useState(null)
  // Is the same as this except in the functional component...
  //  state = {
  //   users: [],
  //   user: {},
  //   loading: false,  // There is going to be a moment in time before we get data back. While its fetching Loading will be True.
  //   alert: null,     // This creates a piece of state that is default set to null for alert.
  //   repos: [],
  // }

  //-------------------------------------------------------------------------------
  // FUNCTIONS/METHODS
  // Search Github users:
  const searchUsers = async (text) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // this is how you change a state's value with a functional App.js
    setUsers(res.data.items)
    setLoading(false) 
  };
  // Get single Github user:
  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data)
    setLoading(false)
  };
  // Get Users Repos
  const getUserRepos = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&
    sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  };
    // Clear users from state:
    const clearUsers = () => {
      setUsers([]);
      setLoading(false);
    };
    // Set Alert taking in msg and type
    const showAlert = (msg, type) => { 
      setAlert({ msg, type }); // When this function is called it will set alert state to the passed in parameters.
      setTimeout(() => setAlert(null) , 4000 );
    };

  // END OF CREATED FUNCTIONS/METHODS
  //-------------------------------------------------------------------------------

      return (
        // Notice here how you have to wrap the whole Router in the GithubState tag.
        <GithubState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <AlertMe alert={alert}/>
                <Switch>  
                  <Route exact path='/' render={props => (
                    <Fragment>
                      <Search searchUsers={searchUsers} 
                      clearUsers={clearUsers} 
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert} // This adds a property to search allowing it to call setAlert function
                      />
                      <Users loading={loading} users={users}/>
                    </Fragment>
                  )}/>
                  {/* This only works if you dont have to pass anything in. */}
                  <Route exact path='/about' component={ About } />
                  {/* This is how you would create another route if you had pass ins: 
                      // Here you see User component being called...
                      // Then we pass in the prop of getUser from the compoent
                      // which is then set to equal the method/function in App.js getUser
                      // and finally user={user} we need to send in the state. */}
                    <Route exact path='/user/:login' render={ props => (
                    <User 
                    { ...props } 
                    getUser={getUser}
                    getUserRepos={getUserRepos} 
                    user={user}
                    repos={repos} 
                    loading={loading} />
                  )} />
                </Switch>
              </div>
            </div>
          </Router>
        </GithubState>
      );
  };

export default App;


  // This lifecycle method, will fire off when the app is first run, when the App component "mounts"
  // This is helpful if you ever want to make an API request right when the page loads this is the place to do it.
  // Also notice this is how your perform an async/await api call with axios.
  // async componentDidMount() {
  //   this.setState({loading: true })

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  //   client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   console.log(res.data)

  //   this.setState({users: res.data, loading:false}) // this is how you change a state's value.
  // }