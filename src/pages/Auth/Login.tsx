import { useState } from 'react';
import { Formik, Form } from 'formik';
import { onLogin } from '../../api/Auth/Login';
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginFrom = () => {
  const [error, setError] = useState([]);

  const initialValues: LoginFormValues = {
    email: '',
    password: ''
  };

  const loginUser = async ( values: LoginFormValues, resetForm: Function ) => {
    const response = await onLogin(values);

    if (response.error) {
      console.log(response.error);
    } else {
      resetForm({});
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
          initialValues={initialValues}
          onSubmit={(values: LoginFormValues, actions) => {
            loginUser(values, actions.resetForm);
          }}
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
            <div className="m-6">
              <Button label="login"/>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default LoginFrom;
