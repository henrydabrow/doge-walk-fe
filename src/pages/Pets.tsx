import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
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

  interface Pet<O> {
    id: string;
    name: string;
    kind: string;
    breed: string;
    owner: O;
  }

  interface Owner {
    firstName: string;
    city: string;
  }

  interface Meta {
    count: string;
    page: string;
    per_page: string;
    page_count: string;
    total_count: string;
  }

  interface CreatePetFormValues {
    name: string;
    kind: string;
    breed: string;
    day: string;
    month: string;
    year: string;
  }

  let history = useHistory();
  const accessToken = getAccessToken();
  const url = process.env.REACT_APP_API_BASE_URL + '/pets';

  const [loading, setLoading] = useState(true);
  const [kind, setKind] = useState('');
  const [data, setData] = useState<Data<Pet<Owner>,Meta>>({
    pets: [{ id: '', name: '', kind: '', breed: '', owner: { firstName: '', city: ''} }],
    meta: { count: '', page: '', per_page: '', page_count: '', total_count: '' }
  });

  const initialValues: CreatePetFormValues = {
    name: '',
    kind: kind,
    breed: '',
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

  const createPet = async (data: CreatePetFormValues) => {
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

    if (response) {
      history.go(0);
    }
    return response;
  }

  if (data.pets) {
    const element = data.pets.map((pet: Pet<Owner>) => {
      return(
        <div className="mx-2 h-36 border-2 border-purple-200 rounded-md">
          <div className="m-2 text-xs font-mono">
            <div key={pet.id}> Hi my name is <b>{pet.name}</b>, I am a {pet.breed} {pet.kind}.
              My owner's name is {pet.owner.firstName} {"together we live in " && pet.owner.city }
            </div>
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
          <div className="my-10 max-w-sm h-xl overflow-auto block justify-center border-2 rounded-md bg-green-50 border-green-20">
            <div className="mx-10">
              <h1 className="grid justify-center text-2xl my-6 font-mono text-purple-400">{"add pet"}</h1>
              <Formik
                initialValues={initialValues}
                onSubmit={(values: CreatePetFormValues) => {
                  createPet(values)
                }}
              >
                {({ handleChange, values }) => (
                  <Form>
                    <InputField
                      name='name'
                      placeholder='name'
                      opts={"border-green-400 w-72"}
                    />
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
                    <div className="my-6 mx-12">
                      <Button label="create"/>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  } else if (loading) {
    return <div>loading...</div>;
  } else {
    return <> </>
  }

}

export default Pets;
