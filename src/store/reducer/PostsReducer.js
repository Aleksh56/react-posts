import {
    ADD_POST,
    UPDATE_POST,
    DELETE_POST,
    LOAD_POSTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    ADD_LIKE,
    REMOVE_LIKE,
    GET_ALL_POSTS
  } from '../actions/PostsActions';
  
  const initialState = {
    posts: [],
  };
  
  const postsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_POST:
        return {
          ...state,
          posts: [action.payload, ...state.posts],
        };
      case GET_ALL_POSTS:
        return{
            posts:[action.payload]
        }
      // case UPDATE_POST:
      //   return {
      //     ...state,
      //     posts: state.posts.map((post) =>
      //       post._id === action.payload._id ? action.payload : post
      //     ),
      //   };
      // case DELETE_POST:
      //   return {
      //     ...state,
      //     posts: state.posts.filter((post) => post._id !== action.payload),
      //   };
      // case LOAD_POSTS:
      //   return {
      //     ...state,
      //     posts: action.payload,
      //   };
      // case ADD_COMMENT:
      //   return {
      //     ...state,
      //     posts: state.posts.map((post) =>
      //       post._id === action.payload.postId
      //         ? {
      //             ...post,
      //             comments: [...post.comments, action.payload.comment],
      //           }
      //         : post
      //     ),
      //   };
      // case DELETE_COMMENT:
      //   return {
      //     ...state,
      //     posts: state.posts.map((post) =>
      //       post._id === action.payload.postId
      //         ? {
      //             ...post,
      //             comments: post.comments.filter(
      //               (comment) => comment._id !== action.payload.commentId
      //             ),
      //           }
      //         : post
      //     ),
      //   };
      // case ADD_LIKE:
      //   return {
      //     ...state,
      //     posts: state.posts.map((post) =>
      //       post._id === action.payload.postId
      //         ? { ...post, likes: action.payload.likes }
      //         : post
      //     ),
      //   };
      // case REMOVE_LIKE:
      //   return {
      //     ...state,
      //     posts: state.posts.map((post) =>
      //       post._id === action.payload.post.Id
      //         ? { ...post, likes: action.payload.likes }
      //         : post
      //     ),
      //   };
      default:
        return state;
    }
  };
  
  export default postsReducer;