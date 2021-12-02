import { store } from "../store";
import { checkAuthorizationAct, logInErrorAct } from "@iso/redux/auth/actions";
import { Hub } from 'aws-amplify';

export default () => new Promise(() => store.dispatch(checkAuthorizationAct()));

Hub.listen("auth", (data) => {
  const listError = [
    "customState_failure",
    "signIn_failure",
    "cognitoHostedUI_failure",
  ];
  if (listError.includes(data.payload.event)) {
    store.dispatch(logInErrorAct())
  }
});