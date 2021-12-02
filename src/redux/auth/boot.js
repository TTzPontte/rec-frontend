import { store } from "../store";
import { checkAuthorizationAct } from "@iso/redux/auth/actions";

export default () => new Promise(() => store.dispatch(checkAuthorizationAct()));
