import {push} from 'react-router-redux';
import localStorage from 'localforage'
import axios from 'axios';

export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_END = 'auth/LOGIN_END';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGIN_AUTHORIZED = 'auth/LOGIN_AUTHORIZED';
export const LOGIN_UNAUTHORIZED = 'auth/LOGIN_UNAUTHORIZED';

export const REGISTER_START = 'auth/REGISTER_START';
export const REGISTER_END = 'auth/REGISTER_END';
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const REGISTER_ERROR = 'auth/REGISTER_ERROR';

// Login
export const LoginStart = () => {
  return {
    type: LOGIN_START,
  }
};
export const LoginEnd = () => {
  return {
    type: LOGIN_END,
  }
};
export const LoginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData
  }
};
export const LoginError = (payload) => {
  return {
    type: LOGIN_ERROR,
    payload
  }
};
export const LoginAuthorized = () => {
  return {
    type: LOGIN_AUTHORIZED,
  }
};

export const LoginUnAuthorized = () => {
  return {
    type: LOGIN_UNAUTHORIZED,
  }
};


// Register
export const RegisterStart = () => {
  return {
    type: REGISTER_START,
  }
};
export const RegisterEnd = () => {
  return {
    type: REGISTER_END,
  }
};
export const RegisterSuccess = (userData) => {
  return {
    type: REGISTER_SUCCESS,
    payload: userData
  }
};
export const RegisterError = (payload) => {
  return {
    type: REGISTER_ERROR,
    payload
  }
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(LoginStart());
    axios.post('http://localhost:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then(function (response) {
        console.log(response);
        dispatch(LoginEnd());
        dispatch(LoginSuccess(response.data));
        localStorage.setItem("userData", response.data).then(() => {
          dispatch(LoginAuthorized());
          dispatch(push('/'));
        }).catch(function () {
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch(LoginEnd());
        let errorMsj = error.message;
        if (error.response) {
          errorMsj = error.response.data.message;
        }
        dispatch(LoginError(errorMsj));
      });

  }
};

export const refreshToken = () => {
  return dispatch => {
    dispatch(LoginStart());
    let userData = localStorage.getItem("userData");
    axios.post('http://localhost:8000/api-token-refresh/', {
      token: userData['token'],
    })
      .then(function (response) {
        console.log(response);
        dispatch(LoginEnd());
        dispatch(LoginSuccess(response.data));
        localStorage.setItem("userData", response.data).then(() => {
          dispatch(LoginAuthorized());
          dispatch(push('/'));
        }).catch(function () {
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch(LoginEnd());
        let errorMsj = error.message;
        if (error.response) {
          errorMsj = error.response.data.message;
        }
        dispatch(LoginError(errorMsj));
      });

  }
};

export const register = (username, password, email, first_name, last_name) => {
  return dispatch => {
    dispatch(LoginStart());
    axios.post('http://localhost:8000/user/register/', {
      username: username,
      email: email,
      first_name: first_name,
      last_name: last_name,
      password: password
    })
      .then(function (response) {
        console.log(response);
        dispatch(RegisterEnd());
        dispatch(RegisterSuccess(response.data));
        dispatch(push('/login'));
      })
      .catch(function (error) {
        dispatch(RegisterEnd());
        let errorMsg = [];
        let {data} = error.response
        if (data) {
          if(data.username) {
            errorMsg.push(data.username)
          }
          if(data.email) {
            errorMsg.push(data.email)
          }
          if(data.password) {
            errorMsg.push(data.password)
          }
          if(data.first_name) {
            errorMsg.push(data.first_name)
          }
          if(data.last_name) {
            errorMsg.push(data.last_name)
          }
        }
        dispatch(RegisterError(errorMsg));
      });

  }
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("userData").then(() => {
      dispatch(LoginUnAuthorized());
      dispatch(push('/'));
    }).catch(function () {
    });
  }
};
