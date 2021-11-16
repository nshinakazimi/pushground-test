export const login = (data) => {
  localStorage.setItem("auth_user", data);
  return {
    type: "AUTH_USER_LOGIN_SUCCESS",
    data: { currentUser: data, isAuthenticated: true },
  };
};

export const isLoggedIn = () => {
  const authenticatedUser = localStorage.getItem("auth_user");
  if (authenticatedUser)
    return {
      type: "AUTH_USER_LOGIN_SUCCESS",
      data: { currentUser: authenticatedUser, isAuthenticated: true },
    };
  else return { type: "AUTH_USER_LOGOUT" };
};

export const logout = () => {
  localStorage.removeItem("auth_user");
  return { type: "AUTH_USER_LOGOUT" };
};
