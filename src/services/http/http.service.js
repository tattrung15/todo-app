import axios from "axios";
import { isNullOrUndefined, isStrEmpty } from "../../helpers/helpers";
import StorageService from "../storage.service";

class HttpService {
  async get(uri, options = { headers: {}, params: {}, body: {} }) {
    return await this.request("GET", uri, options);
  }

  async post(uri, options = { headers: {}, params: {}, body: {} }) {
    return await this.request("POST", uri, options);
  }

  async put(uri, options = { headers: {}, params: {}, body: {} }) {
    return await this.request("PUT", uri, options);
  }

  async patch(uri, options = { headers: {}, params: {}, body: {} }) {
    return await this.request("PATCH", uri, options);
  }

  async delete(uri, options = { headers: {}, params: {}, body: {} }) {
    return await this.request("DELETE", uri, options);
  }

  async request(method, uri, options = { headers: {}, params: {}, body: {} }) {
    const queryParams = this.generateHttpParams(options.params);
    const url = this.resolveUri(uri) + `?${queryParams}`;

    return await axios.request({
      method,
      url,
      headers: this.generateHttpHeaders(options.headers),
      data: options.body,
    });
  }

  resolveUri(uri) {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${process.env.REACT_APP_BASE_API_URL}${uri}`;
  }

  generateHttpHeaders(headerInfo = {}) {
    const token = StorageService.get("access_token") || "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    for (const key of Object.keys(headerInfo)) {
      headers[key] = headerInfo[key];
    }

    return headers;
  }

  generateHttpParams(params = {}) {
    const httpParams = [];
    const objectToQueryString = (obj, prefix) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const k = prefix ? prefix + "[" + key + "]" : key;
          const v = obj[key];
          if (v !== null && typeof v === "object") {
            objectToQueryString(v, k);
          } else {
            if (!isNullOrUndefined(v) && !isStrEmpty(v.toString())) {
              httpParams.push(k + "=" + v);
            }
          }
        }
      }
    };

    objectToQueryString(params);
    return encodeURI(httpParams.join("&"));
  }
}

export default HttpService;
