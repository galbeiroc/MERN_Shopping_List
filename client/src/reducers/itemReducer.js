import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS } from '../actions/types';

const intialState = {
  items: [
    { id: uuid(), name: 'Egss' },
    { id: uuid(), name: 'Milk' },
    { id: uuid(), name: 'Steak' },
    { id: uuid(), name: 'Rice' }
  ]
};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    case DELETE_ITEMS:
      return {
        ...state,
         items: state.items.filter(item => item.id !== action.payload)
      };
      case ADD_ITEMS: 
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    default:
      return state;
  }
}
