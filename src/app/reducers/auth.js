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

const initialState = {
  userData: {},
  isLoginRequesting: false,
  isLoginResponseSuccess: true,
  loginResponseMessage: '',
  registerResponseMessage: '',
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoginRequesting: true,
        loginResponseMessage: "",
      };

    case LOGIN_END:
      return {
        ...state,
        isLoginRequesting: false
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loginResponseMessage: action.payload
      };

    case LOGIN_AUTHORIZED:
      return {
        ...state,
        isLoggedIn: true,
        loginResponseMessage: "",
      };

    case LOGIN_UNAUTHORIZED:
      return {
        ...state,
        isLoggedIn: false,
        userData: {}
      };

      case REGISTER_START:
      return {
        ...state,
        isRegisterRequesting: true,
        registerResponseMessage: "",
      };

    case REGISTER_END:
      return {
        ...state,
        isRegisterRequesting: false
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };

    case REGISTER_ERROR:
      return {
        ...state,
        registerResponseMessage: action.payload
      };

    default:
      return state;
  }
}