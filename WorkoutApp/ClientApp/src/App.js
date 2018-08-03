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
                      <option key={this.props.SelectOptionKey} value={this.props.SelectOptionValue} > {this.props.SelectOptionName} </option>     
                    )
            }
}

class SelectDropdown extends React.Component {
    render() {
        let Options = [];

        const selectableData = this.props.selectableData;

        Options = selectableData.map((data) => <SelectOption SelectOptionKey={data.itemId} SelectOptionValue={data.itemId} SelectOptionName={data.itemName} />);

        return (
                <div className="formSelect">
                    <label>{this.props.labelName}</label>
                    <select id={this.props.elementId} form={this.props.form} name={this.props.name} onChange={this.props.SelectDropdownOnChange}
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
            defaultExcerciseId: 0,

            programVersions: [],
            defaultProgramVersionId: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get("api/ProgramVersion/GetProgramVersions/1000")
            .then(res => {

                const programVersions = res.data.map((data) => {
                    /*create a new object with properties that follow what the SelectDropdown's selectableData prop expects
                      this way the SelectDropdown can be used generically.
                    */                    
                    let newDataItem = { itemId: data.program_Version_Id, itemName: data.program_Version_Desc };

                    return newDataItem;
                })              

                this.setState({ programVersions: programVersions });
                this.setState({ defaultProgramVersionId: programVersions[0].excercise_Id });
            })

        axios.get("api/ProgramVersion/GetProgramVersionExcercises/1")
            .then(res => {
                const excercises = res.data.map((data) => {
                    /*create a new object with properties that follow what the SelectDropdown's selectableData prop expects
                      this way the SelectDropdown can be used generically.
                    */
                    let newDataItem = { itemId: data.excercise_Id, itemName: data.excercise_Name };
                    return newDataItem;
                })

                this.setState({ excercises: excercises });
                this.setState({//use the 1st excercise's id as default
                    defaultExcerciseId: this.state.excercises[0].excercise_Id
                });

            });
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

        })
            .catch(function (response) {
                //handle error
                console.log("response",response);

            });
              
    }

    render() {
        const noteStyle = {
            gridColumnStart: 2,
            gridColumnEnd: 4
        };

        return (
            <div >
                <label>WORKOUT</label><br />
                <SelectDropdown labelName="Program" elementId="programVersionsDropdown" selectableData={this.state.programVersions} SelectDropdownOnChange={this.handleInputChange}
                    value="0" defaultValue={this.state.defaultProgramVersionId} form="frmWorkoutExcercises" name="Program_Version_Id" />

                <SelectDropdown labelName="Excercise" elementId="excercisesDropdown" selectableData={this.state.excercises} SelectDropdownOnChange={this.handleInputChange}
                    value="0" defaultValue={this.state.defaultExcerciseId} form="frmWorkoutExcercises" name="Excercise_Id" />

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
