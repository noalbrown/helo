import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from './routes'
import Nav from './Components/Nav/Nav'
import './App.css';
// My reset.css is in App.css

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes />
      </div>
    );
  }
}

export default App;
