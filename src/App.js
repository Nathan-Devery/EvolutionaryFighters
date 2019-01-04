import React, { Component } from 'react';
import './App.css';
import Matter from 'matter-js'
import RobotPractice from './RobotPractice';
import EvolutionUtilities from './EvolutionUtilities';
import EvolutionComponent from './EvolutionComponent';

class App extends Component {
  render() {
    return (
      /*
      <div className="App">
        <RobotPractice/>
      </div>
      */
      <EvolutionComponent/>
    );
  }
}

export default App;
