import {push} from 'react-router-redux';
import localStorage from 'localforage';
import * as auth from './auth';

export const APP_INITIALIZING = 'init/APP_INITIALIZING';
export const APP_INITIALIZED = 'init/APP_INITIALIZED';

// App Initializing
export const InitializeApp = () => {
  return {
    type: APP_INITIALIZING,
  }
};

export const InitializeAppSuccess = () => {
  return {
    type: APP_INITIALIZED,
  }
};

export const initApp = (redirectUrl) => {
  return dispatch => {
    console.log("initApp")
    dispatch(InitializeApp());
    localStorage.getItem("userData").then((userdata) => {
      if (userdata) {
        dispatch(auth.LoginSuccess(userdata));
        dispatch(auth.LoginAuthorized());
        redirectUrl = redirectUrl === '/login' && '/';
      }
      dispatch(InitializeAppSuccess());
      dispatch(push(redirectUrl));
    }).catch(function(){});
  }
};

