import { Route, Switch } from 'react-router-dom';
import Pets from './pages/Pets';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export const Routes = () =>  {
  return (
    <Switch>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/pets' component={Pets}/>
    </Switch>
  );
}

export default Routes;
