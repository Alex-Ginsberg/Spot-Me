import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import {fetchStudents} from '../reducers/students'
import AddForm from './AddForm'

export default class Students extends Component{
    constructor() {
        super();
        this.state = store.getState();
        console.log(this.state)
    }

    componentDidMount() {
        const studentsThunk = fetchStudents();
        store.dispatch(studentsThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
      }

    render() {
        return (
            <div>
                <button id="addStudent" className="btn btn-success">Add Student</button>
                <ul>
                    {this.state.students.map(student => (
                        <li key={student.id}>{student.name}</li>
                    ))}
                </ul>
                <AddForm />
            </div>
        )
    }
}
