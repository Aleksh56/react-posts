import {
    ADD_PROFILE_DATA,
    REMOVE_PROFILE_DATA,
    UPDATE_PROFILE_DATA,
  } from '../actions/ProfileActions';
  
  const initialState = {
    data: null,
  };
  
  const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PROFILE_DATA:
        return {
          data: action.payload,
        };
      case REMOVE_PROFILE_DATA:
        return {
          data: null,
        };
      case UPDATE_PROFILE_DATA:
        return {
          data: {
            ...state.data,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default ProfileReducer;