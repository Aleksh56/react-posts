import { createStore } from 'redux';
import { combineReducers } from 'redux';
import ProfileReducer from './reducer/ProfileReducer';
import postsReducer from './reducer/PostsReducer';

const initialState = {
  isLoading: true,
  currentPage: 1,
  postsPerPage: 12,
};

const rootReducer = combineReducers({
  profile: ProfileReducer,
  posts: postsReducer
})


const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
