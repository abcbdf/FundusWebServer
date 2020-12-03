import * as express from "express"; 
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app: express.Express) => {
  router.post("/upload", controller.upload);
  router.get("/files/:direction", controller.getListFiles);
  router.get("/clear/:direction", controller.clearFiles);
  router.get("/files/:direction/:name", controller.download);

  app.use(router);
};

export {routes};