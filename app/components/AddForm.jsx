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

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
      }

    handleChange(e) {
        store.dispatch(writeStudent(e.target.value))
    }

    handleSubmit(e) {
        e.preventDefault();

        store.dispatch(postStudent(e.target.studentName.value, e.target.studentEmail.value))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Add Person</label>
                    <input className="form-control" type="text" name="studentName" placeholder="Enter student name" 
                    value={this.state.newStudentEntry} onChange={this.handleChange} />
                    <input className="form-control" type="text" name="studentEmail" placeholder="Enter email address" 
                    value={this.state.newChannelEntry} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Submit Student</button>
                </div>
            </form>
        )
    }
}