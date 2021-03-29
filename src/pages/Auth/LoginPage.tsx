import React, { useState } from 'react';
import { onLogin } from '../../api/Auth/Auth';
import { AuthForm } from '../../components/Auth/Auth';

const LoginPage = () => {

  const [{email, password, passwordConfirmation}, setCredentials] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [error, setError] = useState([])
  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await onLogin({
      email,
      password,
      passwordConfirmation
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
          password,
          passwordConfirmation
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
            passwordConfirmation
          })
        }
      />
      <label htmlFor="password">Password confirmation</label>
      <input
        placeholder="Password confirmation"
        type="password"
        value={passwordConfirmation}
        onChange={
          (event) => setCredentials({
            email,
            password,
            passwordConfirmation: event.target.value
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

export default LoginPage;