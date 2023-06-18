import { SET_IS_LOADING, SET_SORTED_POSTS, SET_CURRENT_PAGE, SET_POSTS } from "../actions/actions";

const initialState = {
    posts: [],
    isLoading: true,
    currentPage: 1,
    postsPerPage: 12,
    sortedPosts: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
                sortedPosts: action.payload,
                isLoading: false,
            };
        case SET_SORTED_POSTS:
            return { ...state, sortedPosts: action.payload, currentPage: 1 };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export default reducer;
