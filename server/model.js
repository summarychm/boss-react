const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/boos';
mongoose.connect(DB_URL);

//数据库模型
const SchemaModel = {
    user: {
        'name': {'type': String, 'require': true},
        'pwd': {'type': String, 'require': true},
        'type': {'type': String, 'require': true},
        'avatar': {'type': String},//头像
        'desc': {'type': String},//个人简介/职位描述
        'title': {'type': String},//职位名称
        'company': {'type': String},//公司
        'money': {'type': String},//工资
    },
    chat: {
        'chatid': {'type': String, 'require': true},
        'from': {'type': String, 'require': true},
        'to': {'type': String, 'require': true},
        'read': {'type': Boolean, default: false},
        'content': {'type': String, 'require': true},
        'create_time': {'type': Number, 'default': +new Date()}
    }
}
for (let m in SchemaModel) {
    //将当前models对象中的数据注册到mongodb中.
    mongoose.model(m, new mongoose.Schema(SchemaModel[m]));
}
module.exports = {
    getModel: function (name) {
        //根据name读取文档
        return mongoose.model(name);
    }
}