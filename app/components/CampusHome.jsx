import React, { Component } from 'react';
import store from '../store';
import { NavLink } from 'react-router-dom';
import {fetchCampuses, deleteCampuses} from '../reducers/campuses';

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

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        return (
            <div className="row">
                <NavLink to={`/campus/add`}>
                <button id="addCampus" className="btn btn-info">Add Campus</button>
                </NavLink>
                {this.state.campuses.map(campus => (
                    <div key={campus.id} className='col-lg-6' >
                        <NavLink to={`/campus/${campus.id}`} className="white">
                            <img className="planetImg" src={campus.image} alt="image" height="300" width="300" />
                            <h2>{campus.name}</h2>
                        </NavLink>
                        <button className="btn btn-danger" onClick={() => {
                            const removeThunk = deleteCampuses(campus.id);
                            store.dispatch(removeThunk);
                            }}>
                            DELETE '{campus.name}' CAMPUS
                            </button>
                    </div>
                ))}
            </div>
        )
    }
}
