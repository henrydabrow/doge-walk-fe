import React, { useState } from 'react';
import { onRegister } from '../../api/Auth/Register';
import { AuthForm } from '../../components/Auth/Login';

const Register = () => {
  const [{ email, password, passwordConfirmation }, setCredentials] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [error, setError] = useState([]);

  const Register = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await onRegister({
      email,
      password,
      passwordConfirmation
    })

    if(response && response.error) {
      setError(response.error);
    }
  }

  return (
    <AuthForm onSubmit={Register}>
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
      <label htmlFor="passwordConfirmation">Password confirmation</label>
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
      <button type="submit">Register</button>
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

export default Register;