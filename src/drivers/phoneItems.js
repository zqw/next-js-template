import Promise from "bluebird";

let phoneGetDataAsyncTimerId;
export const phoneGetDataAsync = function (key) {
  return new Promise(function (resolve, reject) {
    if (phoneGetDataAsyncTimerId) {
      clearTimeout(phoneGetDataAsyncTimerId);
      phoneGetDataAsyncTimerId = undefined;
    }
    phoneGetDataAsyncTimerId = setTimeout(function () {
      reject(new Error("phoneGetDataAsync timeout"));
    }, 1800000); // 最多等30分钟
    global.window.phoneGetDataAsyncCallback = function (value) {
      if (phoneGetDataAsyncTimerId) {
        clearTimeout(phoneGetDataAsyncTimerId);
        phoneGetDataAsyncTimerId = undefined;
      }
      resolve(value);
    };
    let value = window.phoneGetData(key);
    if (value) {
      if (phoneGetDataAsyncTimerId) {
        clearTimeout(phoneGetDataAsyncTimerId);
        phoneGetDataAsyncTimerId = undefined;
      }
      return resolve(value);
    }
  });
};
