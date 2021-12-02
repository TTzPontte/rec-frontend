import { all, call, takeEvery, put, fork, select } from "redux-saga/effects";
import { ACTIONS as ACT } from "./actions"; // auth0 or express JWT

import {
  getUserSession,
  logInGoogle,
  logOutGoogle,
} from "@iso/lib/aws/amplify";

export function* checkAuthorization() {
  yield takeEvery(ACT.CHECK_AUTHORIZATION, function* () {
    try {
      let { user, token } = yield call(getUserSession);

      if (token) {
        yield put({
          type: ACT.LOGIN_SUCCESS,
          payload: {
            profile: user,
            credentials: {
              userToken: token,
            },
            isLoading: false,
          },
        });
      } else {
        yield put({ type: ACT.LOGIN_ERROR });
      }
    } catch {
      yield;
    }
  });
}

export function* loginRequest(teste) {
  yield takeEvery(ACT.LOGIN_REQUEST, () => logInGoogle());
}

export function* loginSuccess() {
  yield takeEvery(ACT.LOGIN_SUCCESS, () => {});
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
