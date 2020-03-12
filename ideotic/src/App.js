import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './Components/home';
import Listbreed from './Components/listbreed';
import Register from './Components/register';
import Login from './Components/login';
import Logout from './Components/logout';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path='/home' component={Home} />
      <Route path='/list' component={Listbreed} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
    </Switch>
  );
}

export default App;
