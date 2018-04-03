const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const app = express();


//中间件
app.use(cookieParser());
app.use(bodyParser.json());

//和user相关的路由,全部使用./user.js文件处理
app.use('/user', require('./user'));

//socket.io 和express配合
const server=require('http').Server(app);
const io=require('socket.io')(server);
io.on('connection',function (socket) {
    //监听当前socket连接的通信
    socket.on("sendmsg",function (data) {
        //进行全局socket广播,使用io.emit
        io.emit('recvmsg',data);
    })
});
server.listen(9093, function () {
    console.log("Node app start at port 9093");
})



