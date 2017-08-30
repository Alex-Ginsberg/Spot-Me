import React, { Component } from 'react';
import store from '../store';
import {putCampus} from '../reducers/campuses'

export default class CampusEdit extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        store.dispatch(putCampus(e.target.campusName.value, this.state.currentCampus.id))
        this.props.history.push(`/campus/${this.state.currentCampus.id}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Change '{this.state.currentCampus.name}' Campus Name</label>
                <input className="form-control" type="text" name="campusName" placeholder="Enter campus name" 
                 required />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit Campus</button>
            </div>
            </form>
        )
    }
}