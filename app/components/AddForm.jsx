import React, { Component } from 'react';
import store from '../store';
import {writeStudent} from '../reducers/newStudentEntry'
import {postStudent, fetchStudents} from '../reducers/students'
import {showForm} from '../reducers/showForm'

export default class AddForm extends Component {
    constructor(props) {
        super(props);
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
        if (this.props.singleCampus) {
            store.dispatch(postStudent(e.target.studentName.value, e.target.studentEmail.value, this.state.currentCampus.id))
        }
        else {
            store.dispatch(postStudent(e.target.studentName.value, e.target.studentEmail.value, e.target.studentCampus.value))
        }
        store.dispatch(showForm());
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Add Person</label>
                    <input className="form-control" type="text" name="studentName" placeholder="Enter student name" 
                    value={this.state.newStudentEntry} onChange={this.handleChange} required />
                    <input className="form-control" type="text" name="studentEmail" placeholder="Enter email address" required  />
                </div>
                <div className="col-xs-10">
                {!this.props.singleCampus && <select className="form-control" name="studentCampus" required>
                    
                    <option value="" defaultValue>Select a campus</option>
                        {
                            this.state.campuses.map(campus => (
                            <option key={campus.id} value={campus.id}>{campus.name}</option>
                        ))
                        }
                    </select>}
                    
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Submit Student</button>
                </div>
            </form>
        )
    }
}