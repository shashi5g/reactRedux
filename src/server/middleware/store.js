import { createStore } from 'redux';

import reducer from '../../reducer';

const configureStore = () => {
  const store = createStore(reducer);

  return store;
};

const storeMiddleware = () => (req, res, next) => {
   
  const store = configureStore();
  req.store = store;
  next();
};

export default storeMiddleware;