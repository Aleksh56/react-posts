export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_SORTED_POSTS = "SET_SORTED_POSTS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_POSTS = "SET_POSTS";

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setPosts = (posts) => {
    return {
      type: SET_POSTS,
      payload: posts,
    };
  };
  
  export const setSortedPosts = (sortedPosts) => {
    return {
      type: SET_SORTED_POSTS,
      payload: sortedPosts,
    };
  };
  
  export const setCurrentPage = (currentPage) => {
    return {
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    };
  };