import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Route from './routes'
import Nav from './Components/Nav/Nav'
import './App.css';
// My reset.css is in App.css

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Route />
      </div>
    );
  }
}

export default App;
