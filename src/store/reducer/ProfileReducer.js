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
      };
    case REMOVE_PROFILE_DATA:
      localStorage.removeItem('profile');
      return {
        ...state,
        isLoggedIn: false,
        data: null,
      };
      case UPDATE_PROFILE_DATA:
        localStorage.setItem('profile', JSON.stringify({ data: action.payload, isLoggedIn: true }));
        return {
          data: action.payload,
        };
    case SET_LOGGED_IN:
      localStorage.setItem('profile', JSON.stringify({isLoggedIn: action.payload }));
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
