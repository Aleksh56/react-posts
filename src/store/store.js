import { createStore } from 'redux';
import reducer from './reducer/reducer';

const initialState = {
  posts: [],
  isLoading: true,
  currentPage: 1,
  postsPerPage: 12,
  sortedPosts: [],
};

const store = createStore(reducer, initialState);
export default store;
