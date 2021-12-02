export const ACTIONS = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
};

/**
 * Ação disparada quando no momento do login
 */
export const logInAct = () => ({
  type: ACTIONS.LOGIN_REQUEST,
});

/**
 * Ação de logout da sessão
 */
export const logOutAct = () => ({
  type: ACTIONS.LOGOUT,
});

/**
 * Ação disparada para verificar sessão do usuário e captura-la
 */
export const checkAuthorizationAct = () => ({
  type: ACTIONS.CHECK_AUTHORIZATION,
});
