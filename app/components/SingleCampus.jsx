import React, { Component } from 'react';
import store from '../store';

export default class SingleCampus extends Component{
    constructor() {
        super();
        this.state = store.getState();
    }
}