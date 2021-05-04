import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { onLogin } from '../../api/Auth/Login';
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'
import InputFieldError from '../../components/atoms/InputFieldError'
import { setAccessToken } from '../../accessToken'

const Login = () => {
  const [error, setError] = useState([]);
  const [formAnimation, setFormAnimation] = useState(false);
  const [formColor, setFormColor] = useState("bg-yellow-50 border-yellow-200")
  const [inputBorder, setInputBorder] = useState("border-yellow-400")

  interface LoginFormValues {
    email: string;
    password: string;
  }

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const loginSchema = Yup.object().shape({
    email:
      Yup.string().required('Required'),
    password:
      Yup.string().required('Password required!')
  });

  const loginUser = async ( values: LoginFormValues, resetForm: Function ) => {
    const response = await onLogin(values);

    if (response.error) {
      setError(response.error);
      setFormAnimation(true);
      setFormColor("bg-red-50 border-red-200");
      setInputBorder("border-red-400");
    } else {
      setAccessToken(response.token);
      resetForm({});
    }
  }

  return(
    <div className={`m-auto my-10 max-w-xs overflow-auto block justify-center border-2 rounded-md
                    ${formColor} ${formAnimation && "animate-shake"}`}
         onAnimationEnd={() => setFormAnimation(false)}
    >
      <div className="mx-10 my-6">
        <h1 className="text-2xl mx-20 my-6 font-mono text-blue-400">login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: LoginFormValues, actions) => { loginUser(values, actions.resetForm) }}
          validationSchema={loginSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <InputField
                name='email'
                placeholder='email'
                border={inputBorder}
              />
              {errors.email && touched.email ? <InputFieldError error={errors.email}/> : null}
              <InputField
                name='password'
                placeholder='password'
                type='password'
                border={inputBorder}
              />
              {errors.password && touched.password ? <InputFieldError error={errors.password}/> : null}
              {error.map((err, index) => (<InputFieldError error={err} key={index}/>))}
              <div className="my-6 mx-7">
                <Button label="login"/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login;
