interface Credentials {
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

export const RegisterRequest = async (data: Credentials) => {
  const url = process.env.REACT_APP_API_BASE_URL + '/users';

  const response = await fetch(url, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(res => res.json())

  return response;
}