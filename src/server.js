import next from "next";
import path from "path";
import fs from "fs";
import express from "express";
import routes from "./routes";
import getConfig from "./config";
import api from "./api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

let isDev = process.env.env_server === "dev" || process.env.env_server === null || process.env.env_server === undefined; // 当前是否是dev环境，涉及到是否开启动态编译
let app = next({
  dev: isDev,
  dir: "." // 指的是src目录
});
let server = express();
let config = getConfig();

app.prepare().then(() => {
  // ----------------------------------------------
  // 1、如果经过npm run export处理过，那么会存在out文件夹
  // ----------------------------------------------
  let outDir = path.join(__dirname, "./out");
  if (fs.existsSync(outDir)) {
    server.use(express.static(outDir));
  }

  server.use(bodyParser.urlencoded({extended: false}));
  server.use(bodyParser.json({type: "application/json"}));
  server.use(cookieParser());

  // -------------------------------
  // 2、路由处理: 后端api路由
  // -------------------------------
  api(server);

  // -------------------------------
  // 3、路由处理: routes路由
  // -------------------------------
  server.use(routes.getRequestHandler(app));

  // -------------------------------
  // 4、路由处理: page文件夹对应路由
  // -------------------------------
  server.get("*", (req, res) => {
    return app.getRequestHandler()(req, res);
  });

  // -------------------------------
  // 5、start server
  // -------------------------------
  server.listen(config.port, err => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:${config.port}`);
  });
});
