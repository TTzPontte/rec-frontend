import { store } from "../store";
import { logInErrorAct } from "@iso/redux/auth/actions";
import { Hub } from "aws-amplify";
import { verifyUserAuthentication } from "@iso/redux/auth/actions";

export default function initBootAuthenticated() {
  const params = new URLSearchParams(global.location.search);

  if (!params.get("code")) {
    store.dispatch(verifyUserAuthentication());
  }

  Hub.listen("auth", (data) => {
    const { event } = data.payload;

    switch (event) {
      case "signIn":
        store.dispatch(verifyUserAuthentication());
        break;
      case "cognitoHostedUI":
        break;
      case "customState_failure":
      case "signIn_failure":
      case "cognitoHostedUI_failure":
        console.log(event);
        store.dispatch(logInErrorAct());
        break;
      case "signOut":
      case "oAuthSignOut":
        break;
      default:
        break;
    }
  });

  return;
}
