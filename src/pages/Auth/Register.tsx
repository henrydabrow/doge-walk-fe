import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { RegisterRequest } from '../../api/Auth/Register';
import Button from '../../components/atoms/Button';
import ExtendedRegistrationForm from '../../components/molecules/ExtendedRegistrationsForm'
import InputField from '../../components/atoms/InputField';
import InputFieldError from '../../components/atoms/InputFieldError';
import { setAccessToken } from '../../accessToken';

const Register = () => {
  let history = useHistory();
  const [error, setError] = useState([]);
  const [formAnimation, setFormAnimation] = useState(false);
  const [formColor, setFormColor] = useState("bg-yellow-50 border-yellow-200");
  const [inputBorder, setInputBorder] = useState("border-yellow-400");
  const [plusTooltip, setPlusTooltip] = useState(false);
  const [expandedForm, setExpandedForm] = useState(false);

  interface RegisterFromValues {
    email: string;
    password: string;
    passwordConfirmation: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    gender?: string;
  }

  const initialValues: RegisterFromValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    postalCode: '',
    gender: '',
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
      Yup.string().required('Password confirmation required!')
         .test('passwordConfirmation',
               'Passwords don\'t match!',
               function (value) { return this.parent.password === value }),
  });

  const registerUser = async ( values: RegisterFromValues, resetForm: Function ) => {
    const response = await RegisterRequest(values);

    if(response.errors) {
      setError(response.errors);
      setFormAnimation(true);
      setFormColor("bg-red-50 border-red-200");
      setInputBorder("border-red-400");
    } else {
      setAccessToken(response.token);
      sessionStorage.setItem('isAuth', 'true');
      history.push('/pets');
      resetForm({});
    }
  }

  return(
    <div className={`m-auto my-10 max-w-xs overflow-auto block justify-center border-2 rounded-md
                     ${formColor} ${formAnimation && "animate-shake"}`}
          onAnimationEnd={() => setFormAnimation(false)}
    >
      <div className="mx-10 my-6">
        <h1 className="text-2xl mx-16 my-6 font-mono text-blue-400">register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: RegisterFromValues, actions) => { registerUser(values, actions.resetForm) }}
          validationSchema={registrationSchema}
        >
          {({ errors, touched, handleChange, values, handleSubmit }) => (
            <Form>
              <InputField
                name='email'
                placeholder='email'
                opts={inputBorder}
              />
              {errors.email && touched.email ? <InputFieldError error={errors.email}/> : null}
              <InputField
                name='password'
                placeholder='password'
                type='password'
                opts={inputBorder}
              />
              {errors.password && touched.password ? <InputFieldError error={errors.password}/> : null}
              <InputField
                name='passwordConfirmation'
                placeholder='password confirmation'
                type='password'
                opts={inputBorder}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ?
                <InputFieldError error={errors.passwordConfirmation}/> : null}
              {error.map((err, index) => (<InputFieldError error={err} key={index}/>))}
              <div className="grid justify-center text-green-500">
                <div className={`h-6 w-6 border-2 rounded-md border-green-400 flex flex-wrap
                  justify-center content-center ${expandedForm && "hidden"}`}
                  onMouseEnter={() => { setPlusTooltip(true) }}
                  onMouseLeave={() => { setPlusTooltip(false) }}
                  onClick={() => { setExpandedForm(true)}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <div className={`h-6 w-6 border-2 rounded-md border-green-400 flex flex-wrap
                  justify-center content-center ${!expandedForm && "hidden"}`}
                  onMouseEnter={() => { setPlusTooltip(true) }}
                  onMouseLeave={() => { setPlusTooltip(false) }}
                  onClick={() => { setExpandedForm(false)}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4"/>
                  </svg>
                </div>
              </div>
              <div className="grid justify-center text-xs font-mono text-gray-600">
                  {plusTooltip && !expandedForm ? <div className="mt-2">expand registration form</div> : null }
                  {plusTooltip && expandedForm ? <div className="mt-2">hide extended registration form</div> : null }
              </div>
              {expandedForm && <ExtendedRegistrationForm inputBorder={inputBorder} handleChange={handleChange} values={values} />}
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
