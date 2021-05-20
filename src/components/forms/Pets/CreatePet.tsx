import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { getAccessToken } from '../../../accessToken';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../atoms/Button';
import InputField from '../../atoms/InputField';
import InputFieldError from '../../atoms/InputFieldError';
import SelectButton from '../../atoms/SelectButton';
import DateSelector from '../../molecules/DateSelector';

interface CreatePetFormValues {
  name: string;
  kind: string;
  breed: string;
  day: string;
  month: string;
  year: string;
}

interface MappesPetFormValues {
  name: string;
  kind: string;
  breed: string;
  date: number;
}

const CreatePetForm = () => {
  let history = useHistory();
  const accessToken = getAccessToken();
  const [error, setError] = useState([]);
  const [kind, setKind] = useState('');

  const initialValues: CreatePetFormValues = {
    name: '',
    kind: kind,
    breed: '',
    day: '',
    month: '',
    year: '',
  };

  const registrationSchema = Yup.object().shape({
    name:
      Yup.string().min(2, 'Too Short!').required('Name required!')
  });

  const createPet = async (data: MappesPetFormValues) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/pets';

    const response = await fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer:${accessToken}`
      },
      body: JSON.stringify(data),
    }).then(res => res.json())

    if (response.errors) {
      setError(response.errors);
    } else {
      history.go(0);
    }
    return response;
  }

  const createDate = (day: string, month: string, year: string) => {
    const date = day + ' ' + month + ' ' + year;

    return Date.parse(date);
  }

  const map_values = (values: CreatePetFormValues) => {
    const date = createDate(values.day, values.month, values.year);

    return {
      name: values.name,
      kind: values.kind,
      breed: values.breed,
      date: date / 1000 // division by 1000 because its returned in miliseconds
    }
  }

  return(
    <div className="m-auto my-10 max-w-sm overflow-auto block justify-center border-2 rounded-md bg-green-50 border-green-20">
      <div className="mx-10 my-6">
        <h1 className="grid justify-center text-2xl my-6 font-mono text-purple-400">add new pet</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: CreatePetFormValues) => {
            const mapped_values = map_values(values);
            createPet(mapped_values);
          }}
          validationSchema={registrationSchema}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <div className="flex justify-between">
                <div
                  onClick={() => {
                    setKind("dog")
                    values.kind = "dog"
                  }}
                >
                  <SelectButton
                    label="dog"
                  />
                </div>
                <div
                  onClick={() => {
                    setKind("cat")
                    values.kind = "cat"
                  }}
                >
                  <SelectButton label="cat"/>
                </div>
              </div>
              <InputField
                name='name'
                placeholder='name'
                opts={"border-green-400 w-74 hover:bg-green-100"}
              />
              {errors.name && touched.name ? <InputFieldError error={errors.name}/> : null}
              <InputField
                name='breed'
                placeholder='breed'
                opts={"border-green-400 w-74 hover:bg-green-100"}
              />
              <DateSelector
                handleChange={handleChange}
                values={values.day}
                name='day'
                border={"border-red-400"}
              />
              <div className="my-6">
                <div className="w-74 h-20 border-2 border-dotted text-green-200 border-green-400 my-6 rounded-md grid justify-center bg-white ">
                    <svg className="w-6 h-6 mt-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <input type="file" className="hidden" />
                <p className="text-green-400">add</p>
                </div>
              </div>
              <div className="my-4">
                {error.map((err, index) => (<InputFieldError error={err} key={index}/>))}
              </div>
              <div className="my-6 mx-14">
                <Button label="create"/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};

export default CreatePetForm;
