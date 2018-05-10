import axios from 'axios'
import localStorage from 'localforage'
import {push} from 'react-router-redux';

import { refreshToken } from './auth'

export const RESTAURANTS_REQUEST_START = 'restaurants/RESTAURANTS_REQUEST_START';
export const RESTAURANTS_REQUEST_END = 'restaurants/RESTAURANTS_REQUEST_END';
export const RESTAURANTS_REQUEST_SUCCESS = 'restaurants/RESTAURANTS_REQUEST_SUCCESS';
export const RESTAURANTS_DETAIL_REQUEST_SUCCESS = 'restaurants/RESTAURANTS_DETAIL_REQUEST_SUCCESS';
export const RESTAURANTS_EDIT_REQUEST_SUCCESS = 'restaurants/RESTAURANTS_EDIT_REQUEST_SUCCESS';
export const RESTAURANTS_REQUEST_ERROR = 'restaurants/RESTAURANTS_REQUEST_ERROR';

export const PRODUCT_SELECTED_SET = 'restaurants/PRODUCT_SELECTED_SET';
export const PRODUCT_SELECTED_UNSET = 'restaurants/PRODUCT_SELECTED_UNSET';
export const PRODUCT_SELECTED_EDIT = 'restaurants/PRODUCT_SELECTED_EDIT';

export const RestaurantsReqStart = () => {
  return {
    type: RESTAURANTS_REQUEST_START
  }
};

export const RestaurantsReqEnd = () => {
  return {
    type: RESTAURANTS_REQUEST_END
  }
};

export const RestaurantsReqSuccess = (payload) => {
  return {
    type: RESTAURANTS_REQUEST_SUCCESS,
    payload
  }
};

export const RestaurantsDetailReqSuccess = (payload) => {
  return {
    type: RESTAURANTS_DETAIL_REQUEST_SUCCESS,
    payload
  }
};

export const RestaurantsEditReqSuccess = (payload) => {
  return {
    type: RESTAURANTS_EDIT_REQUEST_SUCCESS,
    payload
  }
};

export const RestaurantsReqError = () => {
  return {
    type: RESTAURANTS_REQUEST_ERROR
  }
};

export const RestaurantSetSelected = (payload) => {
  return {
    type: PRODUCT_SELECTED_SET,
    payload
  }
};

export const RestaurantUnsetSelected = () => {
  return {
    type: PRODUCT_SELECTED_UNSET
  }
};

export const RestaurantEditSelected = (payload) => {
  return {
    type: PRODUCT_SELECTED_EDIT,
    payload
  }
};

export const getRestaurants = (restaurantsType) => {
  return dispatch => {
    dispatch(RestaurantsReqStart());
    axios.get('http://localhost:8000/restaurants?format=json')
    .then(function (response) {
      dispatch(RestaurantsReqSuccess(response.data));
    })
    .catch(function (error) {
      dispatch(RestaurantsReqError(error));
    });
  }
};

export const getRestaurant = (restaurantId) => {
  return dispatch => {
    dispatch(RestaurantsReqStart());
    axios.get('http://localhost:8000/restaurants/' + restaurantId + '?format=json')
    .then(function (response) {
      dispatch(RestaurantsDetailReqSuccess(response.data));
    })
    .catch(function (error) {
      dispatch(RestaurantsReqError(error));
    });
  }
};

export const editRestaurant = (id, slug, title, description, body, user) => {
  return dispatch => {
    
    dispatch(RestaurantsReqStart());

     var authOptions = {
      method: 'PUT',
      url: 'http://localhost:8000/restaurants/' + id + '/',
      data: {
        'owner_id': user.user.id,
        'slug': slug,
        'title': title,
        'description': description,
        'body': body
      },
      headers: {
          'Authorization': 'JWT ' + user['token'],
      },
    };
    console.log(authOptions);

    axios(authOptions)
      .then(function (response) {
        let restauranLink = '/restaurants/detail/' + id;
        dispatch(RestaurantsReqEnd());
        dispatch(RestaurantsEditReqSuccess(response.data));
        dispatch(push(restauranLink));
      })
      .catch(function (error) {
        dispatch(RestaurantsReqEnd());
        let errorMsg = [];
        let {data} = error.response
        console.log(data);
        if (data) {
          if(data.detail) {
            errorMsg.push(data.detail)
          }
          if(data.title) {
            errorMsg.push(data.title)
          }
          if(data.slug) {
            errorMsg.push(data.slug)
          }
          if(data.description) {
            errorMsg.push(data.description)
          }
          if(data.body) {
            errorMsg.push(data.body)
          }
          if(data.owner_id) {
            errorMsg.push(data.owner_id)
          }
        }
        dispatch(RestaurantsReqError(errorMsg));
      });

  }
};

export const setRestaurant = (productId) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(RestaurantUnsetSelected());
      dispatch(RestaurantsReqStart());
      dispatch(RestaurantsReqEnd());
    }, 200)
  }
};

export const unsetRestaurant = () => {
  return dispatch => {
    dispatch(RestaurantUnsetSelected());
  }
};
