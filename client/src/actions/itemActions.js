import axios from 'axios';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEM, ITEMS_LOADING } from './types';

//This is an actions
export const getItems = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err => console.log('Error', err));
};

export const delteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err => console.log('Error', err));
};

export const addItem = item => dispatch => {
  axios
    .post('/api/items', item)
    .then(res =>
      dispatch({
        type: ADD_ITEMS,
        payload: res.data
      })
    )
    .catch(err => console.log('Error', err));
};

export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
