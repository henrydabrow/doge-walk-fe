import Axios, { AxiosRequestConfig } from 'axios';

export interface Credentials {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const onLogin = async (data: Credentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: process.env.REACT_APP_API_BASE_URL + '/api/v1/registration',
    data
  }

  try {
    const { data: response } = await Axios.request(requestConfig);
  } catch (e) {
    return { error: e.response.data.errors }
  }
}