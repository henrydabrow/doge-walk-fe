import Axios, { AxiosRequestConfig } from 'axios';

export interface Credentials {
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

export const onRegister = async (data: Credentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: process.env.REACT_APP_API_BASE_URL + '/users',
    data: data
  }

  try {
    const { data: response } = await Axios.request(requestConfig);

    return response
  } catch (e) {
    return { error: e.response.data.errors }
  }
}
