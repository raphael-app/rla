export const APP_INITIALIZING = 'init/APP_INITIALIZING';
export const APP_INITIALIZED = 'init/APP_INITIALIZED';

const initialState = {
  isAppInitializing: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_INITIALIZING:
      return {
        ...state,
        isAppInitializing: true
      };

    case APP_INITIALIZED:
      return {
        ...state,
        isAppInitializing: false
      };

    default:
      return state;
  }
}