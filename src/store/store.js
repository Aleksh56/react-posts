import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from "redux";
import ProfileReducer from "./reducer/ProfileReducer";
import thunk from "redux-thunk";
import PostsReducer from "./reducer/PostsReducer";

const rootReducer = combineReducers({
  profile: ProfileReducer,
  posts: PostsReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("profile");
    if (serializedState === null) {
      return undefined;
    }
    const profileData = JSON.parse(serializedState);

    return profileData;
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("profile", serializedState);
  } catch (err) {}
};

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, { profile: persistedState }, enhancer);

store.subscribe(() => {
  saveState(store.getState().profile);
});

export default store;
