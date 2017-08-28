import React, { Component } from 'react';
import store from '../store';
import {fetchCampus} from '../reducers/currentCampus'
import { Link } from 'react-router-dom';
import {fetchStudents} from '../reducers/currentStudents'
import {deleteStudent} from '../reducers/students'
import {deleteCampuses} from '../reducers/campuses'

export default class SingleCampus extends Component{
    constructor() {
        super();
        this.state = store.getState();
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        const campusThunk = fetchCampus(this.props.match.params.campusId);
        store.dispatch(campusThunk);
        const studentThunk = fetchStudents(this.props.match.params.campusId);
        store.dispatch(studentThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleRemove () {
        const removeThunk = deleteCampuses(this.props.match.params.campusId);
        store.dispatch(removeThunk);
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container">
            <h2>{this.state.currentCampus.name}</h2>
            <button id="deleteCampus" className="btn btn-info" onClick={this.handleRemove}>Edit Campus</button>
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
                            <Link to={`/students/${student.id}`}>
                            <td>{student.name}</td>
                            </Link>
                            <td>{student.email}</td>
                            <button className="btn btn-danger" onClick={() => {
                                const removeThunk = deleteStudent(student.id)
                                store.dispatch(removeThunk)
                                const studentThunk = fetchStudents(this.props.match.params.campusId);
                                store.dispatch(studentThunk);}}>X</button>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        )
    }
}