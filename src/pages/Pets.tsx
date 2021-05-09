import { useEffect, useState } from 'react';
import { getAccessToken } from '../accessToken';

const Pets = () => {
  interface Data <T> {
    pets: T[] | [];
  }

  interface Pet {
    id: string;
    name: string;
  }

  const accessToken = getAccessToken();
  const url = process.env.REACT_APP_API_BASE_URL + '/pets';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data<Pet>>({pets: [{id: '', name: ''}]});


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
    const element = data.pets.map((pet: Pet) => {
      return(
        <p key={pet.id}>{pet.name}</p>
      )
    })

    return(<div>
      {element}
    </div>)
  } else if (loading) {
    return <div>loading...</div>;
  } else {
    return <> </>
  }

}

export default Pets;
