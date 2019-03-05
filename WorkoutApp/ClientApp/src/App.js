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
            Program_Version_Id: 0,
            Excercise_Id: 0,
            Weight: 0,
            Set_Number: 0,
            Rep_Number: 0,
            Workout_Excercise_Note: null,
            Workout_Excercise_DateTime: "06/28/2018 1:17PM",

            programs: [],

            programVersions: [],
            defaultProgramVersionId: 0,

            excercises: [],
            defaultExcerciseId: 0,
            
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    GetPrograms() {

        const programs = { Program_Id: 1, Program_Name: "Test", Program_Desc: "Test" };
        const newPrograms = programs.map((data) => {

            return( { itemId: data.excercise_Id, itemName: data.excercise_Name })
        })


        return (newPrograms )
    }

    componentDidMount() {

        const ProgramId = 1000;
        var firstProgramVersionId = 0;

        var programs = this.GetPrograms();

        this.setState({ programs: programs });

        axios.get(`api/ProgramVersion/GetProgramVersions/${ProgramId}`)
            .then(res => {

                const programVersions = res.data.map((data) => {
                    /*create a new object with properties that follow what the SelectDropdown's selectableData prop expects
                      this way the SelectDropdown can be used generically.
                    */                    
                    let newDataItem = { itemId: data.program_Version_Id, itemName: data.program_Version_Desc };

                    return newDataItem;
                })              

                firstProgramVersionId = programVersions[0].itemId;                

                this.setState({ programVersions: programVersions });
                this.setState({
                    Program_Version_Id: firstProgramVersionId,
                    defaultProgramVersionId: firstProgramVersionId
                });

                //note template literals use the uptick mark ` instead of " or '
                axios.get(`api/ProgramVersion/GetProgramVersionExcercises/${firstProgramVersionId}`)
                    .then(res => {
                        const excercises = res.data.map((data) => {
                            /*create a new object with properties that follow what the SelectDropdown's selectableData prop expects
                              this way the SelectDropdown can be used generically.
                            */
                            let newDataItem = { itemId: data.excercise_Id, itemName: data.excercise_Name };
                            return newDataItem;
                        })
                        //console.log("Excercise_Id", excercises[0].itemId);
                        this.setState({ excercises: excercises });
                        this.setState({//use the 1st excercise's id as default
                            Excercise_Id: excercises[0].itemId,
                            defaultExcerciseId: excercises[0].itemId

                        });

                    });

            })       
        
        console.log("state", this.state);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log("name/value", name, value);

        this.setState({
            [name]: value
        },
        () => { console.log("updated state", this.state) });        
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
                console.log("response",response,data);

            });
              
    }

    render() {
        const divStyle = { backgroundColor: "black" };
        const noteStyle = {
            gridColumnStart: 2,
            gridColumnEnd: 4
        };

        return (
            <div style={divStyle}>
                <label>WORKOUT</label><br />
                <SelectDropdown labelName="Program" elementId="programsDropdown" selectableData={this.state.programs} SelectDropdownOnChange={this.handleInputChange}
                    value={this.state.Program_Id} defaultValue={this.state.Program_Id} form="frmWorkoutExcercises" name="Program_Id" />

                <SelectDropdown labelName="Program Version" elementId="programVersionsDropdown" selectableData={this.state.programVersions} SelectDropdownOnChange={this.handleInputChange}
                    value={this.state.Program_Version_Id} defaultValue={this.state.defaultProgramVersionId} form="frmWorkoutExcercises" name="Program_Version_Id" />

                <SelectDropdown labelName="Excercise" elementId="excercisesDropdown" selectableData={this.state.excercises} SelectDropdownOnChange={this.handleInputChange}
                    value={this.state.Excercise_Id} defaultValue={this.state.defaultExcerciseId} form="frmWorkoutExcercises" name="Excercise_Id" />

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
