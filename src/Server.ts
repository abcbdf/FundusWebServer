import * as cors from "cors";
import * as express from "express"; 
import * as path from "path";
import {routes} from "./routes/index";
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
routes(app);

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});

let basedir = path.join(__dirname, "..");
app.use('/public', express.static(basedir + "/public"));

export {port, basedir};
