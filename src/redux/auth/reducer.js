import { ACTIONS as ACT } from "./actions";

const INITIAL_STATE = {
  credentials: {
    appToken: null,
    userToken: null,
  },
  profile: {
    name: "",
    email: "",
    picture: "",
  },
  hasError: false,
  isLogOut: false,
};

export default function authReducer(state = INITIAL_STATE, action = {}) {
  console.log("reducer", { state }, { action });

  switch (action.type) {
    case ACT.CHECK_AUTHORIZATION:
      return state;
    case ACT.LOGIN_REQUEST:
      return state;
    case ACT.LOGOUT:
      return {
        ...INITIAL_STATE,
        isLogOut: true,
      };
    case ACT.LOGIN_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        credentials: action.payload.credentials,
      };
    case ACT.LOGIN_ERROR:
      return {
        ...state,
        hasError: true,
      };
    default:
      return state;
  }
}
