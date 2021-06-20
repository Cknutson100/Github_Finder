import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import User from './components/users/User.js';
import Search from './components/users/Search.js';
import AlertMe from "./components/layout/AlertMe";
import About from "./components/pages/About";

import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'
import './App.css';

 const App = () => {

      return (
        // Notice here how you have to wrap the whole Router in the GithubState tag.
        <GithubState>
          <AlertState>
            <Router>
              <div className="App">
                <Navbar />
                <div className="container">
                  <AlertMe/>
                  <Switch>  
                    <Route exact path='/' render={props => (
                      <Fragment>
                        <Search />
                        <Users />
                      </Fragment>
                    )}/>
                    {/* This only works if you dont have to pass anything in. */}
                    <Route exact path='/about' component={ About } />
                    {/* This is how you would create another route if you had pass ins: 
                        // Here you see User component being called...
                        // Then we pass in the prop of getUser from the compoent
                        // which is then set to equal the method/function in App.js getUser
                        // and finally user={user} we need to send in the state. */}
                      <Route exact 
                      path='/user/:login' 
                      component={User}
                      />
                  </Switch>
                </div>
              </div>
            </Router>
          </AlertState>
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