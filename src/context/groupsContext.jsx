import PropTypes from 'prop-types';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  addGroup,
  addParticipantsApi,
  getAdminGroups,
  getParticipantsApi,
  getEventsApi,
  addEventApi,
} from '../utils/api/groups';
import routes from '../utils/routes';
import { useAuth } from './authContext';

export const groupsContext = createContext();

export const useGroups = () => useContext(groupsContext);

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState(null);
  const [participants, setPartcipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(null);

  const match = useRouteMatch();

  const { user } = useAuth();

  useEffect(() => {
    const { path, params } = match;
    if (path === routes.groups) {
      getAdminGroups(setGroups, setIsLoading, setIsError);
    }
    if (params.uuid) {
      getParticipantsApi(params.uuid, setPartcipants, setIsLoading, setIsError);
      getEventsApi(params.uuid, setEvents, setIsLoading, setIsError);
    }
  }, []);

  const createGroup = (inputData) => {
    const groupData = { ...inputData, email: user.email };
    addGroup(groupData, setIsLoading, setIsError);
  };

  const addParticipants = (inputData) => {
    const data = { groupId: match.params.uuid, members: inputData };
    addParticipantsApi(data, setIsLoading, setIsError);
  };

  const addEvent = (inputData) => {
    const data = { ...inputData, groupId: match.params.uuid };
    addEventApi(data, setIsLoading, setIsError);
  };

  return (
    <groupsContext.Provider
      value={{
        groups,
        createGroup,
        participants,
        addParticipants,
        events,
        addEvent,
        isLoading,
      }}
    >
      {children}
    </groupsContext.Provider>
  );
};

GroupsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
