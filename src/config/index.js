import prodConfig from "./prod";
import sandboxConfig from "./sandbox";
import loConfig from "./lo";
import devConfig from "./dev";

export default function getConfig() {
  let env_server = process.env.env_server;
  switch (env_server) {
    case "vpc_prod":
      return prodConfig;
    case "vpc_sandbox":
      return sandboxConfig;
    case "vpc_lo":
    case "vpc_localhost":
      return loConfig;
    default:
      return devConfig;
  }
}
