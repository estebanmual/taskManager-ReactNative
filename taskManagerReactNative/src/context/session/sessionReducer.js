const SessionReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_USER':
      return {
        ...state,
        userInformation: action.userInformation,
        isLoading: false,
      };
    case 'LOG_IN':
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
