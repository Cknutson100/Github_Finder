import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import User from './components/users/User.js';
import Search from './components/users/Search.js';
import AlertMe from "./components/layout/AlertMe";
import About from "./components/pages/About";
import axios from 'axios';
import './App.css';

 class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,  // There is going to be a moment in time before we get data back. While its fetching Loading will be True.
    alert: null,     // This creates a piece of state that is default set to null for alert.
    repos: [],
  }

  //-------------------------------------------------------------------------------
  // FUNCTIONS
  // Search Github users:
  searchUsers = async (text) => {
    this.setState({loading:true})

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data)

    this.setState({users: res.data.items, loading:false}) // this is how you change a state's value.
  }
  // Get single Github user:
  getUser = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false});
  }
  // Clear users from state:
  clearUsers = () => this.setState({ users: [], loading: false, })
  // Set Alert taking in msg and type
  setAlert = (msg, type) => { 
    this.setState({alert: {msg:msg, type:type}}); // When this function is called it will set alert state to the passed in parameters.
    setTimeout(() => this.setState({ alert: null}), 4000 );
  }

  // Get Users Repos
  getUserRepos = async (username) => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&
    sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({repos: res.data, loading: false});
  }
  //-------------------------------------------------------------------------------

    render() {
      const { users, loading, alert, user, repos } = this.state;

      return (
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <AlertMe alert={alert}/>
              <Switch>  
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert} // This adds a property to search allowing it to call setAlert function
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
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos} 
                  user={user}
                  repos={repos} 
                  loading={loading} />
                )} />
              </Switch>
            </div>
          </div>
        </Router>
      );
    };
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