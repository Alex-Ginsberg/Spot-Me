import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import {fetchStudents, deleteStudent} from '../reducers/students'
import AddForm from './AddForm'
import {showForm} from '../reducers/showForm'
import axios from 'axios';

export default class Students extends Component{
    constructor() {
        super();
        this.state = store.getState();
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        const studentsThunk = fetchStudents();
        store.dispatch(studentsThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    handleClick () {
        store.dispatch(showForm());
    }

    handleRemove(studentId) {
        // axios.delete(`/api/student/${studentId}`)
        //     .then(res => {
        //         const studentsThunk = fetchStudents();
        //         store.dispatch(studentsThunk);
        //     })
        const removeThunk = deleteStudent(studentId);
        store.dispatch(removeThunk);
    }

    render() {
        return (
            <div className="container">
                <button id="addStudent" className="btn btn-success" onClick={this.handleClick}>Add Student</button>          
                <table className="table">
                    <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Campus</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map(student => {
                        return (    
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.campus.name}</td>
                                <button className="btn btn-danger" onClick={() => {
                                    const removeThunk = deleteStudent(student.id)
                                    store.dispatch(removeThunk)}}>X</button>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {this.state.showForm && <AddForm />}
            </div>
        )
    }
}
