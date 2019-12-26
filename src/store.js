import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers';

const persistConfig = {
  key: 'shop',
  storage: storage,
  whitelist: ['shop'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, rootReducer);

// initial state of store
const initialState = {};

// middleware
const middleware = [thunk];

// configuring the store
const store = createStore(
  pReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

const persistor = persistStore(store);

export { persistor, store };
