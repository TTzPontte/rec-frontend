import { store } from "../store";
import { logInErrorAct } from "@iso/redux/auth/actions";
import { Hub } from "aws-amplify";
import { checkAuthorizationAct } from "@iso/redux/auth/actions";

export default function initBootAuthenticated(){
  
  store.dispatch(checkAuthorizationAct());

  Hub.listen("auth", (data) => {
    const listError = [
      "customState_failure",
      "signIn_failure",
      "cognitoHostedUI_failure",
    ];
    if (listError.includes(data.payload.event)) {
      store.dispatch(logInErrorAct());
    }
  });
};
