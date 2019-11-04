export default function cdn() {
  if (!global.window) {
    if (process.env.NODE_ENV == "prod" || process.env.NODE_ENV == "production") {
      return "http://XXXX.com.cn/xxxx"
    }
  }
  return ""
};