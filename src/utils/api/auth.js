import routes from '../routes';
import { axios } from './index';

export const checkEmail = async (
  userEmail,
  setEmailExists,
  setLoading /* setError */,
) => {
  setLoading(true);
  try {
    const response = await axios.get(`/users/check/${userEmail}`);
    const {
      status,
      data: { name },
    } = response.data;

    if (status) {
      setEmailExists({ status, name });
      setLoading(false);
    }
  } catch (error) {
    setEmailExists({ status: false, name: '' });
    setLoading(false);
  }
};

export const login = async (
  data,
  history,
  setIsAuthenticated,
  updateUser,
  setLoading,
  setIsError,
) => {
  setLoading(true);
  try {
    const response = await axios.post('/users/login', {
      email: data.email,
      password: data.password,
    });
    const {
      status,
      data: { token, user },
    } = response.data;
    if (status) {
      localStorage.setItem('token', token);
      updateUser(user);
      setIsAuthenticated(true);
      history.push(routes.groups);
    }
    setLoading(false);
  } catch (error) {
    localStorage.removeItem('token');
    setLoading(false);
    setIsError(error);
  }
};

export const register = async (
  data,
  updateUser,
  setIsAuthenticated,
  history,
  setLoading,
  setIsError,
) => {
  setLoading(true);
  try {
    const response = await axios.post('/groups/create', {
      title: data.title,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const {
      status,
      data: { user, token },
    } = response.data;
    if (status) {
      localStorage.setItem('token', token);
      updateUser(user);
      setIsAuthenticated(true);
      history.push(routes.groups);
    }
    setLoading(false);
  } catch (error) {
    localStorage.removeItem('token');
    setLoading(false);
    setIsError(error);
  }
};
