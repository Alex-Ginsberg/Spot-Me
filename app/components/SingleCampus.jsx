import React, { Component } from 'react';
import store from '../store';
import axios from 'axios';

// this.props.match.params.albumId

export default class SingleCampus extends Component{
    constructor() {
        super();
        this.state = {currentStudents: []}
    }

    componentDidMount() {
        axios.get(`/api/all/${this.props.match.params.campusId}`)
            .then(res => res.data)
            .then(data => {
                this.setState({currentStudents: data})
            })
    }

    render() {
        return (
            <ul>
                {this.state.currentStudents.map(student => {
                    return (
                        <li key={student.id}>{student.name}</li>
                    )
                })}
            </ul>
        )
    }
}