import React, { Component } from 'react';
import store from '../store';
import {fetchCampus} from '../reducers/currentCampus'
import { Link } from 'react-router-dom';
import {fetchCurrentStudents} from '../reducers/currentStudents'
import {deleteStudent} from '../reducers/students'
import {showForm} from '../reducers/showForm'
import AddForm from './AddForm'


export default class SingleCampus extends Component{
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount() {
        const campusThunk = fetchCampus(this.props.match.params.campusId);
        store.dispatch(campusThunk);
        const studentThunk = fetchCurrentStudents(this.props.match.params.campusId);
        store.dispatch(studentThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleClick () {
        store.dispatch(showForm());
    }

    render() {
        return (
            <div className="container">
            <h2>{this.state.currentCampus.name}</h2>
            <Link to={`/campus/${this.state.currentCampus.id}/edit`}>
            <button id="deleteCampus" className="btn btn-info">Edit Campus</button>
            </Link>
            <button id="addStudentToCampus" className="btn btn-info" onClick={this.handleClick}>Add Student To {this.state.currentCampus.name} Campus</button>
            <p>This table shows all students currently enrolled at the {this.state.currentCampus.name} campus:</p>            
            <table className="table">
                <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {this.state.currentStudents.map(student => {
                    return (
                        <tr key={student.id}>
                            <td>{student.id}</td>          
                            <td><Link to={`/students/${student.id}`}>{student.name}</Link></td>      
                            <td>{student.email}</td>
                            <td><button className="btn btn-danger" onClick={() => {
                                const removeThunk = deleteStudent(student.id)
                                store.dispatch(removeThunk)
                                const studentThunk = fetchCurrentStudents(this.props.match.params.campusId);
                                store.dispatch(studentThunk);}}>X</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {this.state.showForm && <AddForm singleCampus={true}/>}
            </div>
        )
    }
}