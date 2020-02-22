import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from './types';

//This is an actions
export const getItems = () => {
  return {
    type: GET_ITEMS
  };
};

export const delteItem = id => {
  return {
    type: DELETE_ITEMS,
    payload: id
  };
};

export const addItem = item => {
  return {
    type: ADD_ITEMS,
    payload: item
  }
}