import React, { Component } from 'react';
import store from '../store';
import axios from 'axios';
import {fetchCampus} from '../reducers/currentCampus'
import {fetchStudents} from '../reducers/currentStudents'

// this.props.match.params.albumId

export default class SingleCampus extends Component{
    constructor() {
        super();
        this.state = store.getState();
        //this.state = {currentStudents: [], currentCampus: ''}
    }

    componentDidMount() {
        const campusThunk = fetchCampus(this.props.match.params.campusId);
        console.log('here')
        store.dispatch(campusThunk);
        const studentThunk = fetchStudents(this.props.match.params.campusId);
        store.dispatch(studentThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        // axios.get(`/api/all/${this.props.match.params.campusId}`)
        //     .then(res => res.data)
        //     .then(data => {
        //         this.setState({currentStudents: data})
        //         axios.get(`/api/campus/${this.props.match.params.campusId}`)
        //             .then(res => res.data)
        //             .then(data => {
        //                 this.setState({currentCampus: data.name})
        //             })
        //     })
    }

    render() {
        return (
            <div className="container">
                {console.log(this.state.currentCampus)}
                {console.log(this.state.currentStudents)}
            <h2>{this.state.currentCampus.name}</h2>
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
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        )
    }
}