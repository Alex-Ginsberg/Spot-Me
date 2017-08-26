import React, { Component } from 'react';
import store from '../store';
import {connect} from 'react-redux'
import {fetchCampuses} from '../reducers/campuses'

export default class CampusList extends Component{
    constructor(props) {
        super(props);
        this.state = store.getState();
        console.log(this.state)
    }

    componentDidMount() {
        const campusesThunk = fetchCampuses();
        store.dispatch(campusesThunk);
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    render() {
        return (
            <div>
                {this.state.campuses.map(campus => (
                    <div key={campus.id}>
                    <img src={campus.image} alt="image" height="150" width="150" />
                    <h2>{campus.name}</h2>
                    </div>
                ))}
            </div>
        )
    }
}
