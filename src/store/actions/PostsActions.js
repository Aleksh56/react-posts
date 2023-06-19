import {api} from '../../api/api';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const GET_ALL_POSTS = 'GET_ALL_POSTS'


export const getAllPosts = () => async (dispatch) => {
  try {
    const allPosts = await api.getAllPosts();
    dispatch({ type: GET_ALL_POSTS, payload: allPosts });
  } catch (error) {
    console.error(error);
  }
};

export const addPost = (newPost) => async (dispatch) => {
  try {
    await api.addNewPost(newPost);
    dispatch({ type: ADD_POST, payload: newPost });
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = (post) => async (dispatch) => {
  try {
    await api.updatePostInfo(post);
    dispatch({ type: UPDATE_POST, payload: post });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (error) {
    console.error(error);
  }
};

export const loadPosts = () => async (dispatch) => {
  try {
    const posts = await api.getAllPosts();
    dispatch({ type: LOAD_POSTS, payload: posts });
  } catch (error) {
    console.error(error);
  }
};

export const addComment = (postId, commentText) => async (dispatch) => {
  try {
    const response = await api.addCommentToPost(postId, commentText);
    const comment = await response.json();
    dispatch({ type: ADD_COMMENT, payload: { postId, comment } });
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.removeCommentFromPost(postId, commentId);
    dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
  } catch (error) {
    console.error(error);
  }
};

export const addLikeToPost = (postId) => async (dispatch) => {
  try {
    const data = await api.likePostRequest(postId);
    dispatch({ type: ADD_LIKE, payload: { postId, likes: data.likes } });
  } catch (error) {
    console.error(error);
  }
};

export const removeLikeFromPost = (postId) => async (dispatch) => {
  try {
    const data = await api.removeLikeRequest(postId);
    dispatch({ type: REMOVE_LIKE, payload: { postId, likes: data.likes } });
  } catch (error) {
    console.error(error);
  }
};