const express = require('express');

const app = express();

//和user相关的路由,全部使用./user.js文件处理
app.use('/user',require('./user'));

app.listen(9093, function () {
    console.log("Node app start at port 9093");
})



