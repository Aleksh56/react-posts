import {
  GET_ALL_POSTS,
  ADD_NEW_POST,
  UPDATE_POST_INFO,
  DELETE_POST,
  GET_INFO_ABOUT_POST_BY_ID,
  LIKE_POST_REQUEST,
  REMOVE_LIKE_REQUEST,
  ADD_COMMENT_TO_POST,
  REMOVE_COMMENT_FROM_POST,
} from "../actions/PostsActions";

const initialState = {
  posts: [],
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default PostsReducer;
