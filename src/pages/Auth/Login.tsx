import React, { useState } from 'react';
import { onLogin } from '../../api/Auth/Login';
import { AuthForm } from '../../components/Auth/Login';

const Login = () => {

  const [{ email, password }, setCredentials] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState([]);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await onLogin({
      email,
      password
    })

    if(response && response.error) {
      setError(response.error);
    }
  }

  return (
    <AuthForm onSubmit={login}>
      <label htmlFor="email">email</label>
      <input
        placeholder="email"
        value={email}
        onChange={
          (event) => setCredentials({
          email: event.target.value,
          password
        })}
      />
      <label htmlFor="password">Password</label>
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={
          (event) => setCredentials({
            email,
            password: event.target.value,
          })
        }
      />
      <button type="submit">Login</button>
      <div>
        {
          error.length > 0 && error.map((e, index) => {
            return <p key={index}>{e}</p>
          })
        }
      </div>
    </AuthForm>
  )
}

export default Login;