import {basedir} from "../Server";
import * as util from "util";
import * as multer from "multer";
import * as path from "path";
import * as Moment from "moment-timezone";
const maxSize = 20 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, basedir + "/public/");
  },
  filename: (req, file, cb) => {
    //console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let historyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, basedir + "/public/" + path.parse(file.originalname).name + "/");
  },
  filename: (req, file, cb) => {
    //console.log(file.originalname);
    //let timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
    let timestamp = Moment().tz('America/Los_Angeles').format('YYYY-MM-DD_HH-mm-ss');
    console.log(timestamp);
    cb(null, timestamp + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let historyUploadFile = multer({
  storage: historyStorage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
let historyUploadFileMiddleware = util.promisify(historyUploadFile);
export { uploadFileMiddleware, historyUploadFileMiddleware };
