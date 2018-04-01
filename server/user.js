const express = require("express");
const utils = require('utility');
const Router = express.Router();
const model = require('./model');

const _filter = {'pwd': 0, '__v': 0};
const User = model.getModel('user');

//
Router.get('/info', function (req, res) {
    const {userid} = req.cookies;
    if (!userid)
        return res.json({code: 1});
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: "1", msg: "/info后台查询错误" + err.toString()})
        }
        return res.json({code: '0', data: doc});
    })
})
Router.get('/list', function (req, res) {
    //User.remove({},function (e,d) {});
    //查找user实体
    User.find({}, function (err, doc) {
        return res.json(doc);
    })
});

//登录接口
Router.post('/login', function (req, res) {
    const {name, pwd} = req.body;
    User.findOne({name: name, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({codePointAt: 1, msg: '用户名密码错误!'});
        }
        res.cookie('userid', doc._id); //设置cookie
        return res.json({code: 0, data: doc});
    })
})
//注册新账户
Router.post('/register', function (req, res) {
    const {name, pwd, type} = req.body;
    User.findOne({name: name}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: "用户名重复了"});
        }
        const userModel = new User({name, type, pwd: md5Pwd(pwd)});
        userModel.save(function (err, data) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了,' + err.toString()})
            }
            const {user, type, _id} = data;
            res.cookie('userid',_id);
            return res.json({code: 0, data: {user, type, _id}});
        })
    })
})

//双层md5加盐
function md5Pwd(pwd) {
    const salt = 'imooc_is_good_asldfjal';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;