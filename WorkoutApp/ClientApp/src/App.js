import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './components/WorkoutAppStyles.css';
import axios from 'axios';

//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

class WorkoutExcerciseForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(event) {
        event.preventDefault();
        //const data = new FormData(event.target);
        var data = {
            Workout_DateTime: "03/24/1975",
            Program_Version_Id: 1,
            Excercise_Id: 1,
            Weight: 25,
            Set_Number: 4,
            Rep_Number: 5,
            Workout_Excercise_Note: null,
            Workout_Excercise_DateTime: "06/28/2018 1:17PM"
        };

        axios.post(
            {
                method: 'post',
                url: '/api/Workout/CreateWorkoutExcercise',
                data: data,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }
        ).then(function (response) {
            //handle success
            console.log(response);
            console.log(response.data);
            console.log(data);
        })
            .catch(function (response) {
                //handle error
                console.log(response);
                console.log(response.data);
                console.log(data);
            });
              
    }
            /*{
            Workout_DateTime: "03/24/1975",
            Program_Version_Id: 1,
            Excercise_Id: 1,
            Weight: 25,
            Set_Number: 4,
            Rep_Number: 5,
            Workout_Excercise_Note: null,
            Workout_Excercise_DateTime: "06/28/2018 1:17PM"
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(data);
            });
        */

    render() {

        return (
            <div >
                WORKOUT
                    <form id="frmWorkoutExcercises" className="formInput" onSubmit={this.handleSubmit}>

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
