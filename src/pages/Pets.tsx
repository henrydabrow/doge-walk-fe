import { useEffect, useState } from 'react';
import { getAccessToken } from '../accessToken';
import CreatePetForm from '../components/forms/Pets/CreatePet';

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

const Pets = () => {
  const accessToken = getAccessToken();
  const url = process.env.REACT_APP_API_BASE_URL + '/pets';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data<Pet<Owner>,Meta>>({
    pets: [{ id: '', name: '', kind: '', breed: '', owner: { firstName: '', city: ''} }],
    meta: { count: '', page: '', per_page: '', page_count: '', total_count: '' }
  });
  const [showPet, setShowPet] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [currentPet, setCurrentPet] = useState<Pet<Owner>>({
    id: '', name: '', kind: '', breed: '', owner: { firstName: '', city: ''}
  })

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
  }, [url, accessToken])

  if (data.pets) {
    const element = data.pets.map((pet: Pet<Owner>) => {
      const message = <>
        Hi my name is <b>{pet.name}</b>,
        I am a {pet.breed} {pet.kind}.
        My owner's name is {pet.owner.firstName}
      </>;

      return(
        <div
          className={`h-${40 * 1} border-2 border-purple-200 rounded-md`}
          onClick={() => {
            setShowPet(1);
            setCurrentPet(pet);
        }}>
          <div className="m-4 text-xs font-mono text-gray-700">
            <div key={pet.id}>{message}</div>
          </div>
        </div>
      )
    })

    return(
      <div>
        <div className="flex items-center justify-center w-full mb-12 mx-2 my-5">
          <div className={`mr-3 text-gray-700 font-medium text-sm font-mono ${!toggle && "text-green-600"}`}>show pets</div>
          <label className="flex items-center cursor-pointer">
            <div className="relative w-22 border-2 border-gray-200 rounded-md">
              <div className="w-16 h-4 bg-gray-400 rounded-md shadow-inner m-2" onClick={() => {setToggle(!toggle)}} />
              <div
                className={`absolute w-6 h-6 bg-gray-100 rounded-md shadow -left-1 -top-1 m-2 transition
                  ${toggle && "transform translate-x-12 bg-green-300"}
                `}
                onClick={() => {setToggle(!toggle)}}
              ></div>
            </div>
          </label>
          <div className={`ml-3 text-gray-700 font-medium text-sm font-mono ${toggle && "text-green-600"}`}>add new pet</div>
        </div>

        {
          !toggle ?
            <div className="grid grid-cols-4 gap-4 mx-2">
              <div className={`col-span-${4 - showPet} grid grid-cols-${4 - showPet} gap-4`}>
                {element}
              </div>
              <div className={`grid col-span-1 ${!showPet && "hidden"} `}>
                <div className="border-2 border-purple-300 rounded-md">
                  <div className="m-2 text-xs font-mono text-purple-700">
                    <div className="flex justify-end">
                      <div
                        className="h-6 w-6 border-2 rounded-md border-purple-300 text-xl
                          flex flex-wrap justify-center content-center"
                        onClick={() => {setShowPet(0)}}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    <div className="mx-4"> Hello {currentPet.name} </div>
                  </div>
                </div>
              </div>
            </div> :
            <CreatePetForm />
        }

      </div>
    )
  } else if (loading) {
    return <div>loading...</div>;
  } else {
    return <> </>
  }

}

export default Pets;
