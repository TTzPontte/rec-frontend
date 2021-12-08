import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import { ACTIONS as ACT } from "./actions"; // auth0 or express JWT
import {
  getUserSession,
  logInGoogle,
  logOutGoogle,
} from "@iso/lib/aws/aws.amplify";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function* checkAuthorization() {
  yield takeEvery(ACT.CHECK_AUTHORIZATION, function* () {
    try {
      let { user: profile, tokenId, accessToken } = yield call(getUserSession);

      if (!tokenId) throw new Error("User not Found");

      yield put({
        type: ACT.LOGIN_SUCCESS,
        payload: {
          profile,
          credentials: {
            tokenId,
            accessToken,
          },
        },
      });
    } catch (e) {
      yield put({ type: ACT.RESET });
    }
  });
}

export function* loginRequest() {
  yield takeEvery(ACT.LOGIN_REQUEST, () => logInGoogle());
}

export function* loginSuccess() {
  yield takeEvery(ACT.LOGIN_SUCCESS, function ({ payload }) {
    const { credentials } = payload;
    localStorage.setItem("token", credentials.appToken);
  });
}

export function* logout() {
  yield takeEvery(ACT.LOGOUT, () => {
    localStorage.removeItem("token");
    history.push("/");
    logOutGoogle();
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(logout),
  ]);
}
