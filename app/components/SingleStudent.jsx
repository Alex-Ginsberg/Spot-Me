import React, { Component } from 'react';
import store from '../store';
import {fetchStudent} from '../reducers/singleStudent'
import { Link } from 'react-router-dom';

export default class SingleStudent extends Component{
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        const studentThunk = fetchStudent(this.props.match.params.id);
        store.dispatch(studentThunk);
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        const student = this.state.singleStudent;
        console.log('in render: ', student)
        return (
            <div className="container">
                <Link to={`/students/${student.id}/edit`}>
                <button id='addStudent' className='btn btn-info'>Edit Student Info</button>
                </Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Campus</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <Link to={`/campus/${student.campus.id}`}>
                            <td>{student.campus.name}</td>
                            </Link>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
