import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import { ACTIONS as ACT } from "./actions"; // auth0 or express JWT
import {
  getUserSession,
  logInGoogle,
  logOutGoogle,
} from "@iso/lib/aws/aws.amplify";
import { getAppToken } from "@iso/lib/aws/aws.authentication";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function* checkAuthorization() {
  yield takeEvery(ACT.CHECK_AUTHORIZATION, function* () {
    try {
      let { user: profile, token: userToken } = yield call(getUserSession);

      if (!userToken) throw new Error("User not Found");

      const { access_token: appToken } = yield call(getAppToken);

      yield put({
        type: ACT.LOGIN_SUCCESS,
        payload: {
          profile,
          credentials: {
            userToken,
            appToken,
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
    localStorage.setItem('token', credentials.appToken)
  });
}

export function* logout() {
  yield takeEvery(ACT.LOGOUT, () => {
    localStorage.removeItem('token')
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
