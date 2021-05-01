import { useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { onRegister } from '../../api/Auth/Register';
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'
import InputFieldError from '../../components/atoms/InputFieldError'

const Register = () => {
  const [error, setError] = useState([]);
  const [formAnimation, setFormAnimation] = useState(false);
  const [formColor, setFormColor] = useState("bg-yellow-50 border-yellow-200")
  const [inputBorder, setInputBorder] = useState("border-yellow-400")

  interface RegisterFromValues {
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  const initialValues: RegisterFromValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const registrationSchema = Yup.object().shape({
    email:
      Yup.string().email('Invalid email').required('Required'),
    password:
      Yup.string().min(8, 'Too Short!').required('Password required!')
         .matches(/^(?=.*[A-Z]).{0,40}\S$/, 'Must contain capital letter!')
         .matches(/^(?=.*[0-9]).{8,40}\S$/, 'Must contain number!')
         .matches(/^(?=.*[!@#$%^&*()]).{8,40}\S$/, 'Must contain special character!'),
    passwordConfirmation:
      Yup.string().test('passwordConfirmation',
                        'Passwords don\'t match!',
                        function (value) { return this.parent.password === value }),
  });

  const registerUser = async ( values: RegisterFromValues, resetForm: Function ) => {
    const response = await onRegister(values);

    if(response && response.error) {
      setError(response.error);
      setFormAnimation(true);
      setFormColor("bg-red-50 border-red-200");
      setInputBorder("border-red-400");
    } else {
      resetForm({});
    }
  }

  return(
    <div className={`m-auto my-10 max-w-xs overflow-auto block justify-center border-2 rounded-md
                     ${formColor} ${formAnimation && "animate-shake"}`}
          onAnimationEnd={() => setFormAnimation(false)}
    >
      <div className="mx-10 my-6">
        <h1 className="text-2xl mx-11 my-6 font-mono text-blue-400">login page</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: RegisterFromValues, actions) => { registerUser(values, actions.resetForm) }}
          validationSchema={registrationSchema}
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
              <InputField
                name='passwordConfirmation'
                placeholder='password confirmation'
                type='password'
                border={inputBorder}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ?
                <InputFieldError error={errors.passwordConfirmation}/> : null}
              {error.map((err, index) => (<InputFieldError error={err} key={index}/>))}
              <div className="my-6 mx-7">
                <Button label="register"/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register;