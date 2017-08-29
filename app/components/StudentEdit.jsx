import React, { Component } from 'react';
import store from '../store';
import {writeStudent} from '../reducers/newStudentEntry'
import {postStudent, putStudent} from '../reducers/students'
import {showForm} from '../reducers/showForm'

export default class StudentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        store.dispatch(putStudent(this.state.singleStudent.id, e.target.newName.value, e.target.newEmail.value, e.target.newCampus.value))
        this.props.history.push(`/`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Change '{this.state.singleStudent.name}' Info</label>
                <input className="form-control" type="text" name="newName" placeholder="Enter new name" 
                 required />
                 <input className="form-control" type="text" name="newEmail" placeholder="Enter new email" 
                 required />
                 <select className="form-control" name="newCampus" required>
                    
                    <option value="" defaultValue>Select a campus</option>
                        {
                            this.state.campuses.map(campus => (
                            <option key={campus.id} value={campus.id}>{campus.name}</option>
                        ))
                        }
                    </select>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit Campus</button>
            </div>
            </form>
        )
    }
}