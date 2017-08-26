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
            <ul>
                {this.state.campuses.map(campus => (
                    <li key={campus.id}>{campus.name}</li>
                ))}
            </ul>
        )
    }
}

// const CampusListContainer = connect(mapStateToProps)(CampusList)
// export default CampusListContainer;

// export default class CampusHome extends Component {
//     constructor() {
//         super();
//     }

//     render() {
//         return (
//             <div>
//                 <p>Whatuppp</p>
//             </div>
//         )
//     }

// }