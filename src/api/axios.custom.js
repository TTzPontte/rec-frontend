import axios from "axios";

export class AxiosCustom {
  static request = axios.create({ baseURL: "http://localhost:5000" });

  static getService() {
    return this.request;
  }

  static setAuthorization(accessToken) {
    this.request.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }
}
