import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

//Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/users/auth', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Config localstore, header and token
export const tokenConfig = getState => {
  //Get token from localstore
  const token = getState().auth.token;

  //Headers
  const config = {
    header: {
      'Content-type': 'application/json'
    }
  };

  //If token, add to headers
  if (token) {
    config.header['x-auth-token'] = token;
  }

  return config;
};
