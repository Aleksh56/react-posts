export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const UPDATE_POST_INFO = "UPDATE_POST_INFO";
export const DELETE_POST = "DELETE_POST";
export const GET_INFO_ABOUT_POST_BY_ID = "GET_INFO_ABOUT_POST_BY_ID";
export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const REMOVE_LIKE_REQUEST = "REMOVE_LIKE_REQUEST";
export const ADD_COMMENT_TO_POST = "ADD_COMMENT_TO_POST";
export const REMOVE_COMMENT_FROM_POST = "REMOVE_COMMENT_FROM_POST";
import { api } from "../../api/api";

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await api.getAllPosts();
    dispatch({
      type: GET_ALL_POSTS,
      payload: response,
    });
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
  }
};

export const addNewPost = (postData) => ({
  type: ADD_NEW_POST,
  payload: postData,
});

export const updatePostInfo = (postId, updatedPostData) => ({
  type: UPDATE_POST_INFO,
  payload: { postId, updatedPostData },
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
});

export const getInfoAboutPostById = (postId) => ({
  type: GET_INFO_ABOUT_POST_BY_ID,
  payload: postId,
});

export const likePost = (postId) => ({
  type: LIKE_POST_REQUEST,
  payload: postId,
});

export const removeLike = (postId) => ({
  type: REMOVE_LIKE_REQUEST,
  payload: postId,
});

export const addCommentToPost = (postId, commentData) => ({
  type: ADD_COMMENT_TO_POST,
  payload: { postId, commentData },
});

export const removeCommentFromPost = (postId, commentId) => ({
  type: REMOVE_COMMENT_FROM_POST,
  payload: { postId, commentId },
});
