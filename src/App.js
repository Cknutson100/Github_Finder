import React from 'react'
import Navbar from './components/layout/Navbar.js'
import Users from './components/users/Users.js'
import './App.css';

class App extends React.Component{

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users />
        </div>

      </div>
    );
  }
  }


export default App;
