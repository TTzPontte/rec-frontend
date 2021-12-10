import { all, call, takeEvery, put, fork } from "redux-saga/effects";
import { ACTIONS as ACT } from "./actions";
import {
  getUserSession,
  logInGoogle,
  logOutGoogle,
} from "@iso/lib/aws/aws.amplify";
import { AxiosCustom } from "@iso/api/axios.custom";
import Api from "@iso/api";

class SagaException {
  constructor(message, fatalError = false) {
    this.message = message;
    this.fatalError = fatalError;
  }
}

function setError(sagaException) {
  if (sagaException.fatalError) {
    localStorage.setItem("hasError", sagaException.message);
  } else {
    localStorage.removeItem("hasError");
  }
}

const StorageToken = {
  set: (value) => localStorage.setItem("token_id", value),
  get: () => localStorage.getItem("token_id"),
  remove: () => localStorage.removeItem("token_id"),
};

export function* verifyUserAuthentication() {
  yield takeEvery(ACT.VERIFY_USER_AUTHENTICATION, function* () {
    try {
      let { user, tokenId, accessToken } = yield call(getUserSession);

      if (!tokenId) throw new SagaException("Session not Found");

      if (StorageToken.get() !== tokenId) {
        const isValidToken = yield call([new Api(), "verifyTokenId"], {
          tokenId,
        });

        if (!isValidToken) throw new SagaException("Invalid TokenId", true);

        StorageToken.set(tokenId);
      }

      yield put({
        type: ACT.LOGIN_SUCCESS,
        payload: {
          profile: user,
          credentials: {
            tokenId,
            accessToken,
          },
        },
      });
    } catch (e) {
      yield put({
        type: e.fatalError ? ACT.LOGOUT : ACT.RESET,
        hasError: !!localStorage.getItem("hasError"),
      });
      setError(e);
    }
  });
}

export function* loginRequest() {
  yield takeEvery(ACT.LOGIN_REQUEST, () => logInGoogle());
}

export function* loginSuccess() {
  yield takeEvery(ACT.LOGIN_SUCCESS, ({ payload }) =>
    AxiosCustom.setAuthorization(payload.credentials.accessToken)
  );
}

export function* refreshToken() {
  yield takeEvery(ACT.REFRESH_TOKEN, function* () {
    let { accessToken } = yield call(getUserSession);
    AxiosCustom.setAuthorization(accessToken);
  });
}

export function* logInError() {
  yield takeEvery(ACT.LOGIN_ERROR, () => {
    setError({
      message: "failed",
      fatalError: true,
    });
  });
}

export function* logout() {
  yield takeEvery(ACT.LOGOUT, () => {
    StorageToken.remove();
    logOutGoogle();
  });
}

export default function* rootSaga() {
  yield all([
    fork(verifyUserAuthentication),
    fork(loginRequest),
    fork(loginSuccess),
    fork(logInError),
    fork(logout),
    fork(refreshToken),
  ]);
}
