import axios from "axios";
import { store } from "@iso/redux/store";
import { refreshTokenAct } from "@iso/redux/auth/actions";
export class AxiosCustom {
  static request = axios.create({ baseURL: process.env.REACT_APP_BACKEND });

  static getService() {
    return this.request;
  }

  static interceptors = this.request.interceptors.response.use(
    (response) => response,
    (error) => {
      this.request.interceptors.response.eject(this.interceptors);

      if (error.response.status === 403) {
        store.dispatch(refreshTokenAct());
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  static setAuthorization(accessToken) {
    this.request.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
}