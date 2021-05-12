import { useEffect, useState } from 'react';
import { getAccessToken } from '../accessToken';
import { Formik, Form } from 'formik';
import Button from '../components/atoms/Button';
import SelectButton from '../components/atoms/SelectButton';
import InputField from '../components/atoms/InputField';
import DateSelector from '../components/molecules/DateSelector'

const Pets = () => {
  interface Data <P,M> {
    pets: P[] | [];
    meta: M;
  }

  interface Pet {
    id: string;
    name: string;
  }

  interface Meta {
    count: string;
    page: string;
    per_page: string;
    page_count: string;
    total_count: string;
  }

  interface LoginFormValues {
    email: string;
    password: string;
    day: string;
    month: string;
    year: string;
  }

  const accessToken = getAccessToken();
  const url = process.env.REACT_APP_API_BASE_URL + '/pets';

  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState<Data<Pet,Meta>>({
    pets: [{ id: '', name: '' }],
    meta: { count: '', page: '', per_page: '', page_count: '', total_count: '' }
  });

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    day: '',
    month: '',
    year: '',
  };

  useEffect(() => {
    fetch(url,
      {
        method: 'GET',
        credentials: 'include',
        headers: {'Authorization': `Bearer:${accessToken}`}
      }
    )
    .then(res => res.json() || [])
    .then(data => {
      setData(data);
      setLoading(false);
    })
  }, [])

  if (data.pets) {
    console.log(data.meta);
    const element = data.pets.map((pet: Pet) => {
      console.log(pet);
      return(
        <div className="mx-2 h-12 border-2 border-purple-200 rounded-md">
          <div key={pet.id}>
            {pet.name}
            </div>
        </div>
      )
    })

    return(
      <div>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 my-10 grid grid-cols-3 gap-2">
            {element}
          </div>
          <div className="grid justify-end col-span-5 mx-2">
          <div className={`my-10 max-w-sm overflow-auto block justify-center border-2 rounded-md bg-green-50 border-green-200`}>
            <div className="mx-10 my-6">
              <h1 className="grid justify-center text-2xl my-6 font-mono text-purple-400">{"add pet"}</h1>
              <Formik
                initialValues={initialValues}
                onSubmit={() => {console.log('x')}}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form>
                    <InputField
                      name='name'
                      placeholder='name'
                      opts={"border-green-400 w-72"}
                    />
                    <div className="flex justify-between">
                      <div>
                        <SelectButton label="dog"/>
                      </div>
                      <div>
                        <SelectButton label="cat"/>
                      </div>
                    </div>
                    <InputField
                      name='breed'
                      placeholder='breed'
                      opts={"border-green-400 w-72"}
                    />
                    <div>
                      <DateSelector
                        handleChange={handleChange}
                        values={values.day}
                        name='day'
                        border={"border-red-400"}
                      />
                    </div>
                    <div className="my-6 mx-7">
                      <Button label="create"/>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          </div>
        </div>
        <p className="grid justify-center" onClick={() => {setCounter(counter + 1)}}>
            {data.meta.page_count}
          </p>
          <p>
            {counter}
          </p>
      </div>
    )
  } else if (loading) {
    return <div>loading...</div>;
  } else {
    return <> </>
  }

}

export default Pets;
