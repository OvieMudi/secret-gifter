import Axios from 'axios';

const BASE_URL = 'https://santa-secret-api.herokuapp.com';

const token = localStorage.getItem('token');

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export { Axios };
