import React, { Component } from 'react';
import store from '../store';
import {writeCampus} from '../reducers/newCampusEntry'
import {postCampus} from '../reducers/campuses'
import { Link } from 'react-router-dom';

export default class AddCampus extends Component {
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
        store.dispatch(writeCampus(e.target.value))
    }

    handleSubmit(e) {
        e.preventDefault();
        store.dispatch(postCampus(e.target.campusName.value))  
        this.props.history.push('/')
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Add New Campus</label>
                    <input className="form-control" type="text" name="campusName" placeholder="Enter campus name" 
                    value={this.state.newCampusEntry} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Submit Campus</button>
                </div>
            </form>
        )
    }
}