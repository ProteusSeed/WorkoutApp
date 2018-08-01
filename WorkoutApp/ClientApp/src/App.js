import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './components/WorkoutAppStyles.css';
import axios from 'axios';
import { propTypes } from 'react';

class SelectOption extends React.Component {
    render() {
                return(
                    <option key={this.props.excercise_Id} value={this.props.excercise_Id} > {this.props.excercise_Name} </option>
                    )
            }
}

class SelectDropdown extends React.Component {
    render() {
        const selectableData = this.props.selectableData;
        const Options = selectableData.map((excercise) => <option key={excercise.excercise_Id} value={excercise.excercise_Id}> {excercise.excercise_Name} </option>);

        return (
            <div className="formSelect">
                <label>Excercise</label>
                    <select id="Excercises" form={this.props.form} name={this.props.name} onChange={this.props.SelectDropdownOnChange}
                            value={this.props.value} defaultValue={this.props.defaultValue}>
                            {Options}
                </select>
                </div>
                        )
    }
}

class WorkoutExcerciseForm extends React.Component {
    constructor() {
        super();
        this.state = {
            Workout_DateTime: "03/24/1975",
            Program_Version_Id: 1,
            Excercise_Id: 0,
            Weight: 0,
            Set_Number: 0,
            Rep_Number: 0,
            Workout_Excercise_Note: null,
            Workout_Excercise_DateTime: "06/28/2018 1:17PM",
            excercises: [],
            defaultExcerciseId: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("api/ProgramVersion/GetProgramVersionExcercises/1")
            .then(res => {
                const excercises = res.data;
                this.setState({ excercises: excercises });
                this.setState({//use the 1st excercise's id as default
                    defaultExcerciseId: this.state.excercises[0].excercise_Id
                });
                //this.props.setExcerciseIdCallback(this.name, this.state.defaultExcerciseId);
                console.log(this.state.excercises);
            });
    }

    ExcerciseDropdownChange = (event) => {
        this.setState({ Excercise_Id: event.target.value});
        //console.log(event.target.value);
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

        axios.post('/api/Workout/CreateWorkoutExcercise', data )
        .then(function (response) {
            //handle success
           //console.log(response);
            //console.log(response.data);
            //console.log("data",data);
        })
            .catch(function (response) {
                //handle error
                console.log("response",response);
                //console.log("Response data",response.data);
                //console.log("data", data);
            });
              
    }

    render() {
        const noteStyle = {
            gridColumnStart: 2,
            gridColumnEnd: 4
        };

        return (
            <div >
                <label>WORKOUT</label><br/>
                     <SelectDropdown selectableData={this.state.excercises} SelectDropdownOnChange={this.ExcerciseDropdownChange}
                    Value="0" defaultValue={this.state.defaultExcerciseId} form="frmWorkoutExcercises" name="ExcerciseSelectDropdown" />
                    <form id="frmWorkoutExcercises" className="formInput" onSubmit={this.handleSubmit}>

                        <label>Workout Date</label>
                    <input type="datetime-local" id="Workout_DateTime" name="Workout_DateTime" onChange={this.handleInputChange}/>

                        <label>Set Number</label>
                        <input type="number" name="Set_Number" onChange={this.handleInputChange}/>

                        <label>Weight</label>
                        <input type="number" name="Weight" onChange={this.handleInputChange}/>

                        <label>Reps</label>
                        <input type="number" name="Rep_Number" onChange={this.handleInputChange}/>

                        <label>Note</label>
                        <input type="text" name="Workout_Excercise_Note" onChange={this.handleInputChange} style={noteStyle} />

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
