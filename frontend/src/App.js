import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/dashboard.component";

function App() {
  let loggined = window.localStorage.getItem('user') ? true : false;

  const signout = (e) => {
    localStorage.removeItem("user");
    window.location.href = '/sign-in'
  }

  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          
          <div className="collapse navbar-collapse" id="">
            <ul className="navbar-nav ml-auto">
              {!loggined &&
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>Login</Link>
                </li>
              }
             {!loggined &&
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>Sign up</Link>
                </li>
              }
              {loggined &&
                <li className="nav-item">
                  <Link className="nav-link" onClick={signout}>Sign out</Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />

            {!loggined &&
              <Route exact path="/*" component={Login} />
            }
            {loggined &&
              <Route exact path="/dashboard" component={Dashboard} />
            }
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;