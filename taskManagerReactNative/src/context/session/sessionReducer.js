const SessionReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_USER':
      return {
        ...state,
        userInformation: action.payload.userInformation,
        isLoading: false,
      };
    case 'SIGN_UP':
      return {
        ...state,
        userInformation: action.payload.userInformation,
        isLoading: false,
      };
    case 'LOG_IN':
      return {
        ...state,
        userInformation: action.userInformation,
        isLoading: false,
      };
    case 'LOG_OUT':
      return {
        ...state,
        userInformation: action.userInformation,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default SessionReducer;
