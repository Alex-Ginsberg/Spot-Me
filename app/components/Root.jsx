import React, { Component } from 'react';
import CampusHome from './CampusHome'
import store from '../store';

export default class WinterJokes extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <CampusHome />
      </div>
    )
}
}

