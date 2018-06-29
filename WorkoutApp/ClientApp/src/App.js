import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './components/WorkoutAppStyles.css';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

export default class App extends Component {
  displayName = App.name

  render() {
              return (
                        <div >                       
                          <form className="formInput">                         
                              <label>Set Number</label>
                              <input type="number" name="txtSetNumber" />
                         
                              <label>Weight</label>
                              <input type="number" name="txtWeight" />
                    
                              <label>Reps</label>
                              <input type="number" name="txtNumberOfReps" />
                        
                              <button>Send data!</button>
                          </form>
                        </div>
            );
          }
}
