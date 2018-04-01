const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const app = express();
//中间件
app.use(cookieParser());
app.use(bodyParser.json());

//和user相关的路由,全部使用./user.js文件处理
app.use('/user', require('./user'));

app.listen(9093, function () {
    console.log("Node app start at port 9093");
})



