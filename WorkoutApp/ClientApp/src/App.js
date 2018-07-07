import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './components/WorkoutAppStyles.css';
import axios from 'axios';

//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';
class ExcerciseDropdown extends React.Component {
    state = {
        excercises: []
    }

    componentDidMount(){
        axios.get("api/ProgramVersion/GetProgramVersionExcercises/1")
            .then(res => {
                const excercises = res.data;
                this.setState({ excercises });
                console.log(excercises);
            });
    }

    render() {
        return (
            <select id="Excercises" form="frmWorkoutExcercises" name="Excercise_Id" >
                {this.state.excercises.map(excercise => <option key={excercise.excercise_Id} value={excercise.excercise_Id}> {excercise.excercise_Name} </option> ) }
            </select>
        )
    }
}

class WorkoutExcerciseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Workout_DateTime: "03/24/1975",
            Program_Version_Id: 1,
            Excercise_Id: 0,
            Weight: 0,
            Set_Number: 0,
            Rep_Number: 0,
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

    render() {

        return (
            <div >
                WORKOUT
                    <form id="frmWorkoutExcercises" className="formInput" onSubmit={this.handleSubmit}>

                    <ExcerciseDropdown/>

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
