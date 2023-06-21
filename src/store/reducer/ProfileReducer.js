import {
  ADD_PROFILE_DATA,
  REMOVE_PROFILE_DATA,
  UPDATE_PROFILE_DATA,
  SET_LOGGED_IN
} from '../actions/ProfileActions';

const initialState = {
  data: null,
  isLoggedIn: false
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE_DATA:
      return {
        data: action.payload,
        isLoggedIn: true
      };
    case REMOVE_PROFILE_DATA:
      return {
        isLoggedIn: false
      };
    case UPDATE_PROFILE_DATA:
      return {
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
