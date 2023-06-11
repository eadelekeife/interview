import { configureStore } from '@reduxjs/toolkit'
import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './actions/userActions';

const defaultStore = {
  users: [],
  loading: false,
  error: ''
};

const users = (store = defaultStore, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...store,
        // loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...store,
        users: action.payload
      };
    case FETCH_USERS_FAILURE:
      return {
        ...store,
        error: action.payload
      };
    default:
      return store
  }
}

const store = configureStore({
  reducer: { users },
})

export default store;