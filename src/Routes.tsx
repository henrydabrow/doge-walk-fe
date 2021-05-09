import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/molecules/Navbar';
import Pets from './pages/Pets';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export const Routes = () =>  {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/pets' component={Pets}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
