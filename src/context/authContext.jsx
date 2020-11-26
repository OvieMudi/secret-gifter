import PropTypes from 'prop-types';
import React, { useState, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { checkEmail, login, register } from '../utils/api/auth';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const existingTokens = localStorage.getItem('token');

export const AuthContextProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isAuthenticated, setIsAuthenticated] = useState(existingTokens);
  const [user, setUser] = useState({});
  const [emailExists, setEmailExists] = useState({
    status: false,
    userName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const history = useHistory();

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const checkExistingEmail = (email) => {
    checkEmail(email, setEmailExists, setIsLoading);
  };

  const handleLogin = (data) => {
    login(
      data,
      history,
      setIsAuthenticated,
      updateUser,
      setIsLoading,
      setIsError,
    );
  };

  const handleRegister = (data) => {
    register(
      data,
      updateUser,
      setIsAuthenticated,
      history,
      setIsLoading,
      setIsError,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authTokens,
        setTokens,
        user,
        updateUser,
        emailExists,
        checkExistingEmail,
        handleLogin,
        handleRegister,
        isLoading,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
