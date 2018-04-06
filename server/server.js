const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const model = require('./model');
const Chat = model.getModel('chat');

const app = express();

//中间件
app.use(cookieParser());
app.use(bodyParser.json());

//和user相关的路由,全部使用./user.js文件处理
app.use('/user', require('./user'));

//socket.io 和express配合
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function (socket) {
    //监听当前socket连接的通信
    socket.on("sendmsg", function (data) {
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join("_");
        Chat.create({chatid, from: from, to, 'content': msg}, function (err, data) {
            // 使用io.emit进行全局socket广播
            io.emit('recvmsg', Object.assign({}, data._doc));
        });
    })
});
server.listen(9093, function () {
    console.log("Node app start at port 9093");
})



