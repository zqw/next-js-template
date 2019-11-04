export default function (server) {
  server.post("/api/GET_AIR_STS", function (req, res) {
    return res.json({error: "miss parameter"});
  });
}