'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {loadUser} from './reducers/userReducer'

import store from './store'
import Root from './components/Root'

// store.dispatch(loadUser());

render (
  <Provider store={store}>
      <Root />
  </Provider>,
  document.getElementById('main')
)