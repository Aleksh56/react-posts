export const ADD_PROFILE_DATA = 'ADD_PROFILE_DATA';
export const REMOVE_PROFILE_DATA = 'REMOVE_PROFILE_DATA';
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const setLoggedIn = (isLoggedIn) => {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn,
  };
};

export const addProfileData = (data) => ({
  type: ADD_PROFILE_DATA,
  payload: data,
});

export const removeProfileData = () => ({
  type: REMOVE_PROFILE_DATA,
});

export const updateProfileData = (data) => ({
  type: UPDATE_PROFILE_DATA,
  payload: data,
});