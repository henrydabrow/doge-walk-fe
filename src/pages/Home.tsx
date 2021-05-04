import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAccessToken } from '../accessToken';

const Home = () => {
  const accessToken = getAccessToken();
  const [pets, setPets] = useState<any[]>([]);

  useEffect(() => {
    axios.get(
      process.env.REACT_APP_API_BASE_URL + '/pets',
      { headers: {'Authorization': `Bearer:${accessToken}`} }
    ).then(res => {
      setPets(res.data.data);
    })
  }, [])

  const element = pets.map(pet => {
    return <p>{pet.name}</p>
  })

  return(<div>
    {element}
  </div>)
}

export default Home;