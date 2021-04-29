import Axios, { AxiosRequestConfig } from 'axios';

export interface Credentials {
  email: string;
  password: string;
}

export const onLogin = async (data: Credentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: process.env.REACT_APP_API_BASE_URL + '/users/login',
    data: data
  }

  try {
    const { data: response } = await Axios.request(requestConfig);

    return response
  } catch (e) {
    return { error: e.response.data.errors }
  }
}
