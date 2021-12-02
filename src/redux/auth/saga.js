import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";

import { getToken, clearToken } from "@iso/lib/helpers/utility";
import { ACTIONS as ACT } from "./actions"; // auth0 or express JWT

import { getUserSession } from "@iso/lib/aws/amplify";

const history = createBrowserHistory();

export function* checkAuthorization() {
  yield takeEvery(ACT.CHECK_AUTHORIZATION, function* () {
    try {
      let { user, token } = yield call(getUserSession);

      if (!token) throw new Error("User not found");

      yield put({
        type: ACT.LOGIN_SUCCESS,
        payload: {
          profile: user,
          credentials: {
            userToken: token,
          },
        },
      });
    } catch {
      yield put({ type: ACT.LOGIN_ERROR });
    }
  });
}

export function* loginRequest(teste) {
  yield takeEvery(ACT.LOGIN_REQUEST, function* () {});
}

export function* loginSuccess() {
  yield takeEvery(ACT.LOGIN_SUCCESS, function* ({ payload }) {
    yield localStorage.setItem("id_token", JSON.stringify(payload));
    yield localStorage.setItem("id_token", JSON.stringify(payload));
  });
}

export function* loginError() {
  yield takeEvery(ACT.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(ACT.LOGOUT, function* () {
    yield clearToken();
    history.push("/");
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
