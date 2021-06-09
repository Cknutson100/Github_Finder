import React from 'react';
import Navbar from './components/layout/Navbar.js';
import Users from './components/users/Users.js';
import Search from './components/users/Search.js';
import Alert from "/.components/layout/Alert.js";
import axios from 'axios';
import './App.css';

 class App extends React.Component{
  state = {
    users: [],
    loading: false,  // There is going to be a moment in time before we get data back. While its fetching Loading will be True.
    alert: null,     // This creates a piece of state that is default set to null for alert.
  }

  // Search Github users:
  searchUsers = async (text) => {
    this.setState({loading:true})

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data)

    this.setState({users: res.data.items, loading:false}) // this is how you change a state's value.
  }
  // Clear users from state:
  clearUsers = () => this.setState({ users: [], loading: false, })
  // Set Alert taking in msg and type
  setAlert = (msg, type) => { 
    this.setState({alert: {msg:msg, type:type}}); // When this function is called it will set alert state to the passed in parameters.
  }

    render() {
      const { users, loading, alert } = this.state;

      return (
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert}/>
            <Search searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert} // This adds a property to search allowing it to call setAlert function
            />
            <Users loading={loading} users={users}/>
          </div>

        </div>
      );
    }
  }


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