import { Route, Routes } from 'react-router-dom';
import Pets from './pages/Pets';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

export const AppRoutes = () =>  {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/pets' element={<Pets />}/>
    </Routes>
  );
}

export default AppRoutes;
