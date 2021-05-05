export interface Credentials {
  email: string;
  password: string;
}

export const LoginRequest = async (data: Credentials) => {
  const url = process.env.REACT_APP_API_BASE_URL + '/users/login';

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
