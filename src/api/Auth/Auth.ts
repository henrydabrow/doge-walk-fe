import Axios, { AxiosRequestConfig } from 'axios';

export interface Credentials {
  email: string;
  password: string;
}

export const onLogin = async (data: Credentials) => {
  const requestConfig: AxiosRequestConfig = {
    method: 'post',
    url: process.env.REACT_APP_API_BASE_URL + '/pets',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*'
    }
  }

  try {
    const { data: response } = await Axios.request(requestConfig);
  } catch (e) {
    return { error: e.response.data.errors }
  }
}