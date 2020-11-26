import { axios } from './index';

export const getAdminGroups = async (setGroups, setLoading, setIsError) => {
  setLoading(true);
  try {
    const response = await axios.get(`/groups/get-groups`);
    const { status, data } = response.data;

    if (status) {
      setGroups(data);
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};

export const addGroup = async (groupData, setIsLoading, setIsError) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`/groups/create`, groupData);
    const { status } = response.data;

    if (status) {
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};

export const addParticipantsApi = async (
  paticipantsData,
  setIsLoading,
  setIsError
) => {
  setIsLoading(true);
  try {
    setIsLoading(true);
    const response = await axios.post(`/members/add`, paticipantsData);
    const { status } = response.data;

    if (status) {
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};

export const getParticipantsApi = async (
  groupId,
  setParticipants,
  setIsLoading,
  setIsError
) => {
  try {
    setIsLoading(true);
    const response = await axios.get(`/members/get-all/${groupId}`);
    const { status, data } = response.data;

    if (status) {
      setIsLoading(false);
      setParticipants(data);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};

export const getEventsApi = async (
  groupId,
  setEvents,
  setIsLoading,
  setIsError
) => {
  try {
    const response = await axios.get(`/santas/get-all/${groupId}`);
    const { status, data } = response.data;

    if (status) {
      setIsLoading(false);
      setEvents(data);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};

export const addEventApi = async (eventData, setIsLoading, setIsError) => {
  setIsLoading(true);
  try {
    const response = await axios.post(`/santas/create`, eventData);
    const { status } = response.data;

    if (status) {
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};

export const discoverApi = async (token, setAnon, setIsLoading, setIsError) => {
  setIsLoading(true);
  try {
    const response = await axios.get(`/santas/pair/${token}`);
    const { status, data } = response.data;

    if (status) {
      setIsLoading(false);
      setAnon(data);
    }
  } catch (error) {
    setIsLoading(false);
    setIsError(true);
    console.log('error', error);
  }
};
