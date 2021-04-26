import Axios, { AxiosRequestConfig } from 'axios';

export interface Credentials {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const onRegister = async (data: Credentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: process.env.REACT_APP_API_BASE_URL + '/users',
    data: data
  }

  try {
    const { data: response } = await Axios.request(requestConfig);

    console.log(response)
    return response
  } catch (e) {
    return { error: e.response.data.errors }
  }
}