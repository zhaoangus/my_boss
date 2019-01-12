import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossInfo/bossInfo'
import CandidateInfo from './container/candidateInfo/candidateInfo'
import DashBoard from './component/dashBoard/dashBoard'
import Chat from './component/chat/chat'
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

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/candidateinfo' component={CandidateInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root'));

