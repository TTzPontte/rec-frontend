export const ACTIONS = {
  VERIFY_USER_AUTHENTICATION: "VERIFY_USER_AUTHENTICATION",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  RESET: "RESET",
};

export const logInAct = () => ({
  type: ACTIONS.LOGIN_REQUEST,
});

export const logOutAct = () => ({
  type: ACTIONS.LOGOUT,
});

export const verifyUserAuthentication = () => ({
  type: ACTIONS.VERIFY_USER_AUTHENTICATION,
});

export const logInErrorAct = () => ({
  type: ACTIONS.LOGIN_ERROR,
});

export const refreshTokenAct = () => ({
  type: ACTIONS.REFRESH_TOKEN,
});
