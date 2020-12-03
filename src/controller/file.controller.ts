import {basedir} from "../Server";
import * as path from "path";

import { uploadFileMiddleware, historyUploadFileMiddleware } from "../middleware/upload";

const fs = require("fs");
const baseUrl = "http://localhost:3000/files/";

const upload = async (req, res) => {
  try {
    // await uploadFileMiddleware(req, res);
    // await historyUploadFileMiddleware(req, res);
    await Promise.all([uploadFileMiddleware(req, res), historyUploadFileMiddleware(req, res)]);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  //console.log(basedir);
  const directoryPath = basedir + "/public/" + req.params.direction + "/";
  if (!fs.existsSync(directoryPath)){
      fs.mkdirSync(directoryPath);
  };


  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
      console.log("send 500");
    }
    //console.log(files);
    let fileInfos: any[] = [];

    files.forEach((file) => {
      fileInfos.push({
        "name": file,
        "url": baseUrl + req.params.direction + "/" + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = basedir + "/public/" + req.params.direction + "/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const clearFiles = (req, res) => {
  const directoryPath = basedir + "/public/" + req.params.direction + "/";

  fs.readdir(directoryPath, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directoryPath, file), err => {
        if (err) throw err;
      });
    }
  });

  res.status(200).send({
    message: "Uploaded clear file successfully"
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
  clearFiles,
};
