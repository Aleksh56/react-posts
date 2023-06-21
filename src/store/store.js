import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ProfileReducer from './reducer/ProfileReducer';
import postsReducer from './reducer/PostsReducer';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: [], // Удалите редьюсеры из blacklist, которые вы хотите сохранить
  version: 1, 
};

const rootReducer = combineReducers({
  profile: ProfileReducer,
  posts: postsReducer,
});

const resettableReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, resettableReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware()
);

const store = createStore(
  persistedReducer,
  initialState,
  enhancer
);

const persistor = persistStore(store);

export { store, persistor };
