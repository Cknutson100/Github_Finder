import React from 'react'
import Navbar from './components/layout/Navbar.js'
import Users from './components/users/Users.js'
import Search from './components/users/Search.js'
import axios from 'axios'
import './App.css';

class App extends React.Component{
  state = {
    users: [],
    loading: false  // There is going to be a moment in time before we get data back. While its fetching Loading will be True.
  }

  // This lifecycle method, will fire off when the app is first run, when the App component "mounts"
  // This is helpful if you ever want to make an API request right when the page loads this is the place to do it.
  // Also notice this is how your perform an async/await api call with axios.
  async componentDidMount() {
    this.setState({loading: true })

    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data)

    this.setState({users: res.data, loading:false}) // this is how you change a state's value.
  }

    render() {
      return (
        <div className="App">
          <Navbar />
          <div className="container">
            <Search />
            <Users loading={this.state.loading} users={this.state.users}/>
          </div>

        </div>
      );
    }
  }


export default App;
