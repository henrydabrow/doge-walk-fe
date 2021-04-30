import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import { onRegister } from '../../api/Auth/Register';
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'

const Register = () => {
  interface IUser {
    email: string;
    password: string;
    passwordConfirmation: string;

  }

  const [{ email, password, passwordConfirmation }, setCredentials] = useState<IUser>({
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

  return(
    <div className="
      m-6 max-w-xs overflow-auto
      block justify-center
      border-2 rounded-md border-yellow-200
      bg-yellow-50"
    >
      <div className="mx-14 my-6">
        <h1 className="text-2xl mx-5 my-6 font-mono text-blue-400">login page</h1>
        <Formik
          initialValues={{ email: '', password: '', passwordConfirmation: ''}}
          onSubmit={onRegister}
        >
          <Form>
            <InputField
              name='email'
              placeholder='email'
            />
            <InputField
              name='password'
              placeholder='password'
              type='password'
            />
            <InputField
              name='password_confirmation'
              placeholder='password confirmation'
              type='password'
            />
            <div className="m-6">
              <Button label="register"/>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register;