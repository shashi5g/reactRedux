import { createStore } from 'redux';

import reducer from '../reducer';

const configureStore = () => {
   const preloadedState = window.PRELOADED_STATE;

  const store = createStore(
    reducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

export default configureStore;