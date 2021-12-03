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
  isLoading: true,
};


export default function authReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    case ACT.CHECK_AUTHORIZATION:
      return state;
    case ACT.LOGIN_REQUEST:
      return state;
    case ACT.LOGOUT:
      return INITIAL_STATE
    case ACT.LOGIN_SUCCESS:
      return {
        ...state,
        profile: action.payload.profile,
        credentials: action.payload.credentials,
        isLoading: false,
      };
    case ACT.LOGIN_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      };
    case ACT.RESET:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
