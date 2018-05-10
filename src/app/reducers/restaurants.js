//import {List, Map} from 'immutable';

export const RESTAURANTS_REQUEST_START = 'restaurants/RESTAURANTS_REQUEST_START';
export const RESTAURANTS_REQUEST_END = 'restaurants/RESTAURANTS_REQUEST_END';
export const RESTAURANTS_REQUEST_SUCCESS = 'restaurants/RESTAURANTS_REQUEST_SUCCESS';
export const RESTAURANTS_DETAIL_REQUEST_SUCCESS = 'restaurants/RESTAURANTS_DETAIL_REQUEST_SUCCESS';
export const RESTAURANTS_EDIT_REQUEST_SUCCESS = 'restaurants/RESTAURANTS_EDIT_REQUEST_SUCCESS';
export const RESTAURANTS_REQUEST_ERROR = 'restaurants/RESTAURANTS_REQUEST_ERROR';

export const RESTAURANT_SELECTED_SET = 'restaurants/RESTAURANT_SELECTED_SET';
export const RESTAURANT_SELECTED_UNSET = 'restaurants/RESTAURANT_SELECTED_UNSET';
export const RESTAURANT_SELECTED_EDIT = 'restaurants/RESTAURANT_SELECTED_EDIT';

const initialState = {
  restaurants: [],
  selectedRestaurant: {},
  editedRestaurant: {},
  isRestaurantsRequesting: false,
  isRestaurantsResponseSuccess: true,
  restaurantsResponseMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANTS_REQUEST_START:
      return {
        ...state,
        isRestaurantsRequesting: true
      };

    case RESTAURANTS_REQUEST_END:
      return {
        ...state,
        isRestaurantsRequesting: false
      };

    case RESTAURANTS_REQUEST_SUCCESS:

      return {
        ...state,
        restaurants: action.payload
      };

    case RESTAURANTS_DETAIL_REQUEST_SUCCESS:

      return {
        ...state,
        selectedRestaurant: action.payload
      };

    case RESTAURANTS_EDIT_REQUEST_SUCCESS:

      return {
        ...state,
        editedRestaurant: action.payload
      };

    case RESTAURANTS_REQUEST_ERROR:
      return {
        ...state,
        restaurantsResponseMessage: action.payload
      };

    case RESTAURANT_SELECTED_SET:
      return {
        ...state,
        selectedProduct: action.payload
      };

    case RESTAURANT_SELECTED_UNSET:
      return {
        ...state,
        selectedProduct: {id:null}
      };

    case RESTAURANT_SELECTED_EDIT:
      return {
        ...state,
        selectedProduct: action.payload
      };

    default:
      return state;
  }
}