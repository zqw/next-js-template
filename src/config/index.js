import prodConfig from "./prod";
import devConfig from "./dev";

export default function getConfig() {
  let env_server = process.env.env_server;
  switch (env_server) {
    case "vpc_prod":
      return prodConfig;
    default:
      return devConfig;
  }
}
