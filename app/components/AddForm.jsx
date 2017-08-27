import React, { Component } from 'react';
import store from '../store';
import {writeStudent} from '../reducers/newStudentEntry'
import {postStudent} from '../reducers/students'

export default class AddForm extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        store.dispatch(writeStudent(e.target.value))
    }

    handleSubmit(e) {
        e.preventDefault();

        store.dispatch(postStudent(e.target.studentName.value))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Add Person</label>
                    <input className="form-control" type="text" name="studentName" placeholder="Enter student name" 
                    value={this.state.newChannelEntry} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Submit Student</button>
                </div>
            </form>
        )
    }
}