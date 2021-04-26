import React from 'react';
import './App.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}/>
      </Switch>
      <Switch>
        <Route path='/register' component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
