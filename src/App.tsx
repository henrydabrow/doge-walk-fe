import './App.css';
import Navbar from './components/molecules/Navbar';
import Pets from './pages/Pets';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={Pets}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
