import { createStore } from 'redux';
import { combineReducers } from 'redux';
import reducer from './reducer/reducer';
import ProfileReducer from './reducer/ProfileReducer';

const initialState = {
  isLoading: true,
  currentPage: 1,
  postsPerPage: 12,
  sortedPosts: [],
};

const rootReducer = combineReducers({
  profile: ProfileReducer
})


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
