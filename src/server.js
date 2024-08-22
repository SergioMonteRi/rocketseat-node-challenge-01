import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { url, method } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  console.log(route);

  return res.writeHead(404).end("Not found");
});

server.listen(3333);
