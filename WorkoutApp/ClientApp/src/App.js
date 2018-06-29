import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './components/WorkoutAppStyles.css';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

class WorkoutExcerciseForm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
                return (
                    <div >
                        WORKOUT
                            <form id="frmWorkoutExcercises" className="formInput">

                            <select id="Excercises" form="frmWorkoutExcercises">
                                <option value="1">Squat</option>
                                <option value="2">Bench Press</option>
                                <option value="3">Dead Lift</option>
                                <option value="4">Military Press</option >
                            </select>

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

export default class App extends Component {
  displayName = App.name

  render() {
            return <WorkoutExcerciseForm/>
          }
}
