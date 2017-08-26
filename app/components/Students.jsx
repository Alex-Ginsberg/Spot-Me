import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import {fetchStudents} from '../reducers/students'

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

    render() {
        return (
            <ul>
                {this.state.students.map(student => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        )
    }
}
