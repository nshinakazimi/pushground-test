const initialData = {
  currentUser: null,
  isAuthenticated: false,
};

const user = (state = initialData, action) => {
  switch (action.type) {
    case "AUTH_USER_LOGIN_SUCCESS":
      return {
        ...state,
        currentUser: action.data.user,
        isAuthenticated: action.data.isAuthenticated,
      };
    case "AUTH_USER_LOGOUT":
        return {
          ...state,
          currentUser: null,
          isAuthenticated: false,
        };
    default:
      return state;
  }
};

export default user;
