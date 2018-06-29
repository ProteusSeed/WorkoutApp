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
                      WORKOUT
                          <form className="formInput"> 
                              <label>Excercise</label>
                              <input list="Excercises" name="ExcerciseId" id="txtExcerciseId"/>
                          <datalist id="Excercises">
                                      <option value="Internet Explorer"/>
                                          <option value="Firefox"/>
                                              <option value="Chrome"/>
                                                  <option value="Opera"/>
                                                      <option value="Safari"/>
                                    </datalist> 

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
