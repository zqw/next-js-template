import axios from "axios";
import Promise from "bluebird";

function request(method, url, data, config) {
  data = data || {};

  let axiosInstance = axios.create({
    timeout: 10000, // 增加timeout到10秒
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });

  return axiosInstance[method](url, data, config).catch(function (error) {
    return Promise.reject(error);
  });
}

let axiosProxy = {
  get: function (url, config) {
    return request("get", url, config);
  },
  delete: function (url, config) {
    return request("delete", url, config);
  },
  head: function (url, config) {
    return request("head", url, config);
  },
  options: function (url, config) {
    return request("options", url, config);
  },
  post: function (url, data, config) {
    return request("post", url, data, config);
  },
  put: function (url, data, config) {
    return request("put", url, data, config);
  },
  patch: function (url, data, config) {
    return request("patch", url, data, config);
  }
};

export default axiosProxy;
