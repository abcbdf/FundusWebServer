import * as express from "express"; 
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app: express.Express) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

export {routes};