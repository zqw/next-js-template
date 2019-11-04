const utils = {
  padLeft(str, len, char) {
    let s = str + "";
    return new Array(len - s.length + 1).join(char, "") + s;
  },
  padRight(str, len, char) {
    let s = str + "";
    return s + new Array(len - s.length + 1).join(char, "");
  },
  // 传入的字符串．要补齐的长度
  complementNumber(str, needlen) {
    if (str.length < needlen) {
      let j = 0;
      let len = needlen - str.length;
      for (j = 0; j < len; j++) {
        str = str + "0";
      }
    }
    return str;
  },
  format2: function (date, format) {
    let o = {
      "M+": date.getMonth() + 1, // month
      "d+": date.getDate(), // day
      "h+": date.getHours(), // hour
      "m+": date.getMinutes(), // minute
      "s+": date.getSeconds(), // second
      "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
      "S+": date.getMilliseconds() // millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  },

  // md5: function (str) {
  //   return crypto
  //     .createHash('md5')
  //     .update(str)
  //     .digest('hex')
  // },

  isInteger: function (s) {
    if (s === undefined) {
      return false;
    }
    if (/^(([1-9][0-9]*)|0)$/.test(s.toString())) {
      return true;
    }
    return false;
  },

  isEmpty: function (result) {
    return !result || result.toString() === "undefined";
  },

  isGenerator: function (obj) {
    return typeof obj.next === "function" && typeof obj.throw === "function";
  },

  isPromise: function (obj) {
    return typeof obj.then === "function";
  },

  isObject: function (obj) {
    return Object === obj.constructor;
  },

  err_report: function (error) {
    return [
      {
        error: "need" + error
      }
    ];
  },
  getUrlPara: function (paramName) {
    if (!window) {
      return "";
    }

    let paramValue = "", isFound = !1;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
      let arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"), i = 0;
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
  }

};

export default utils;
