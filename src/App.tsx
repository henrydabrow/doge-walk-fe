import { useEffect, useState } from 'react';
import { setAccessToken } from './accessToken';
import { Routes } from './Routes';

const App = () => {
  const url = process.env.REACT_APP_API_BASE_URL + '/auth/refresh';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, {
      method: "POST",
      credentials: "include"
    }).then(async x => {
      const { token } = await x.json() || "";
      setAccessToken(token);

      //TODO refactor isAuth management
      if (token) {
        console.log(token)
        sessionStorage.setItem('isAuth', 'true');
      }
      else {
        console.log('token_expired')
        sessionStorage.setItem('isAuth', 'false');
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
}

export default App;
