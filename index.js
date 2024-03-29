
const serverlessExpress = require('serverless-http')
const express = require('express')
const multer = require('multer');
const app = express()
const upload = multer();

AutoLoad = require('@njs2/base/base/autoload.class');
AutoLoad.loadConfig();
AutoLoad.loadModules();

const { Executor } = require("@njs2/base");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());


app.all('*', async function (req, res) {
  console.log("Call reached right place")
    // Neutralize input parameter received from express for Executor.executeRequest
  let executorReq = {};
  executorReq.httpMethod = req.method;
  executorReq.queryStringParameters = req.query;
  executorReq.body = req.body;
  executorReq.pathParameters = {
    proxy: req.path.length ? req.path.slice(1) : req.path
  };
  executorReq.headers = req.headers;
  if(req.files && req.files.length) {
    if (req.files.length > 1 ) {
      return res.send({
        responseCode: 400,
        responseMessage: "Only one file upload at a time is allowed",
        responseData: {},
      })
  
    }
    req.files.forEach(file => {
      executorReq.body[file.fieldname] = {
        type: 'file',
        filename: file.originalname,
        contentType: file.mimetype,
        content: file.buffer
      }
    });
  }
  const executor = new Executor();
  const result = await executor.executeRequest(executorReq);
  return res.send(result);

})
 
exports.handler = serverlessExpress(app)
