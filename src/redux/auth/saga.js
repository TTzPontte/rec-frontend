import { all, call, takeEvery, put, fork, select } from "redux-saga/effects";
import { createBrowserHistory } from "history";

import { getToken, clearToken } from "@iso/lib/helpers/utility";
import { ACTIONS as ACT, logOutAct } from "./actions"; // auth0 or express JWT

import {
  getUserSession,
  logInGoogle,
  logOutGoogle,
} from "@iso/lib/aws/amplify";

const history = createBrowserHistory();

export function* checkAuthorization() {
  yield takeEvery(ACT.CHECK_AUTHORIZATION, function* () {
    try {
      let { user, token } = yield call(getUserSession);

      if (!token) yield put({ type: ACT.LOGIN_ERROR });

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
      yield;
    }
  });
}

export function* loginRequest(teste) {
  yield takeEvery(ACT.LOGIN_REQUEST, () => logInGoogle());
}

export function* loginSuccess() {
  yield takeEvery(ACT.LOGIN_SUCCESS, function* ({ payload }) {
    yield localStorage.setItem("id_token", JSON.stringify(payload));
    yield localStorage.setItem("id_token", JSON.stringify(payload));
  });
}

export function* logout() {
  yield takeEvery(ACT.LOGOUT, function* () {
    yield put({ type: ACT.LOGOUT });
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
