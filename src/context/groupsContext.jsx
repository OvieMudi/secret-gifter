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
  getGroupInfoApi,
} from '../utils/api/groups';
import routes from '../utils/routes';
import { useAuth } from './authContext';

export const groupsContext = createContext();

export const useGroups = () => useContext(groupsContext);

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState(null);
  const [group, setGroup] = useState(null);
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
    if (path === routes.groupInfo && params.uuid) {
      getGroupInfoApi(params.uuid, setGroup, setIsLoading, setIsError);
    }
    if (path === routes.discover && params.uuid) {
      getParticipantsApi(params.uuid, setPartcipants, setIsLoading, setIsError);
      getEventsApi(params.uuid, setEvents, setIsLoading, setIsError);
    }
    // if (path )
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
        group,
        createGroup,
        participants,
        addParticipants,
        events,
        addEvent,
        isLoading,
        isError,
      }}
    >
      {children}
    </groupsContext.Provider>
  );
};

GroupsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
