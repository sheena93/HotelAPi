import React, { Component } from 'react';
import './App.css';
import './Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SEARCH HERE !</h1>
        </header>
        <p className="App-intro">
          To get started, search in the input field.
        </p>
        Search : <input type="text" name="Search" ></input>
      </div>

    );
  }
}

export default App;
