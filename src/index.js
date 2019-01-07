import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import './index.css'

const store = createStore(
  reducers,
  composeWithDevTools(
      applyMiddleware(thunk)
  )
)
// const store = createStore(reducers, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtensions ? window.devToolsExtensions() : f => f
// ))

function Boss () {
  return <h2>Boss</h2>
}

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path='/boss' component={Boss}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root'));

