import { useState } from 'react'
import { Formik, Form } from 'formik';
import { onRegister } from '../../api/Auth/Register';
import Button from '../../components/atoms/Button'
import InputField from '../../components/atoms/InputField'

const Register = () => {
  const [error, setError] = useState([]);
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

  const registerUser = async ( values: RegisterFromValues, resetForm: Function ) => {
    const response = await onRegister(values);

    if(response && response.error) {
      console.log(response.error.join("\n"));
      setError(response.error);
      setFormColor("bg-red-50 border-red-200");
      setInputBorder("border-red-400");
    } else {
      resetForm({});
    }
  }

  return(
    <div className={"m-6 max-w-xs overflow-auto\
                     block justify-center\
                     border-2 rounded-md  " + formColor}
    >
      <div className="mx-14 my-6">
        <h1 className="text-2xl mx-5 my-6 font-mono text-blue-400">login page</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: RegisterFromValues, actions) => {
            registerUser(values, actions.resetForm)
          }}
        >
          <Form>
            <InputField
              name='email'
              placeholder='email'
              border={inputBorder}
            />
            <InputField
              name='password'
              placeholder='password'
              type='password'
              border={inputBorder}
            />
            <InputField
              name='passwordConfirmation'
              placeholder='password confirmation'
              type='password'
              border={inputBorder}
            />
            <div>
              {
                error.length > 0 && error.map((e, index) => {
                  return(
                    <p
                      key={index}
                      className="m-2 font-mono text-xs"
                    >{e}
                    </p>
                  )
                })
              }
            </div>
            <div className="my-6">
              <Button label="register"/>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register;