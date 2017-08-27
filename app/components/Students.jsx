import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import {fetchStudents} from '../reducers/students'
import AddForm from './AddForm'
import {showForm} from '../reducers/showForm'

export default class Students extends Component{
    constructor() {
        super();
        this.state = store.getState();
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

    render() {
        return (
            <div>
                <button id="addStudent" className="btn btn-success" onClick={this.handleClick}>Add Student</button>
                <ul>
                    {this.state.students.map(student => (
                        <li key={student.id}>{student.name}</li>
                    ))}
                </ul>
                {this.state.showForm && <AddForm />}
                
            </div>
        )
    }
}
