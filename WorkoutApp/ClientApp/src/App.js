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
        this.state = {
            Workout_DateTime: "03/24/1975",
            Program_Version_Id: 1,
            Excercise_Id: 1,
            Weight: 0,
            Set_Number: 0,
            Rep_Number: 5,
            Workout_Excercise_Note: null,
            Workout_Excercise_DateTime: "06/28/2018 1:17PM"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

    }

    handleSubmit(event) {
        event.preventDefault();

        const { Workout_DateTime, Program_Version_Id, Excercise_Id, Weight, Set_Number,
            Rep_Number, Workout_Excercise_Note, Workout_Excercise_DateTime } = this.state;//This is called Destructuring Assignment
        const data = this.state;
        //const data = new FormData(event.target());
        //const data = {
        //    Workout_DateTime: "03/24/1975",
        //    Program_Version_Id: 1,
        //    Excercise_Id: 1,
        //    Weight: 25,
        //    Set_Number: 4,
        //    Rep_Number: 5,
        //    Workout_Excercise_Note: null,
        //    Workout_Excercise_DateTime: "06/28/2018 1:17PM"
        //};

        //TRY THIS! https://stackoverflow.com/questions/43251394/react-form-using-axios-post

        axios.post('/api/Workout/CreateWorkoutExcercise', data )//{ Workout_DateTime, Program_Version_Id, Excercise_Id, Weight, Set_Number, Rep_Number, Workout_Excercise_Note, Workout_Excercise_DateTime } )
        .then(function (response) {
            //handle success
            console.log(response);
            console.log(response.data);
            //console.log("data",data);
        })
            .catch(function (response) {
                //handle error
                console.log("response",response);
                console.log("Response data",response.data);
                console.log("data", data);
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

                    <select id="Excercises" form="frmWorkoutExcercises" name="Excercise_Id">
                        <option value="1">Squat</option>
                        <option value="2">Bench Press</option>
                        <option value="3">Dead Lift</option>
                        <option value="4">Military Press</option >
                    </select>

                    <label>Set Number</label>
                    <input type="number" name="Set_Number" onChange={this.handleInputChange}/>

                    <label>Weight</label>
                    <input type="number" name="Weight" onChange={this.handleInputChange}/>

                    <label>Reps</label>
                    <input type="number" name="Rep_Number" onChange={this.handleInputChange}/>

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
