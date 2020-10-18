import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import WelcomeComponent from './components/WelcomeComponent';
import MainComponent from './components/MainComponent';
import PersonalComponent from './components/PersonalComponent';
import DOBComponent from './components/DOBComponent';
import AgreementComponent from './components/AgreementComponent';

import './index.css';
import RegisterReducer from './reducer/RegisterReducer';

const store = createStore(
  RegisterReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <MainComponent>
          <Router>
            <Switch>
            <Route exact path="/">
                <WelcomeComponent />
              </Route>
              <Route exact path="/welcome">
                <WelcomeComponent />
              </Route>
              <Route path="/personal">
                <PersonalComponent />
              </Route>
              <Route path="/dob">
                <DOBComponent />
              </Route>
              <Route path="/agreement">
                <AgreementComponent />
              </Route>
            </Switch>
          </Router>
        </MainComponent>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
