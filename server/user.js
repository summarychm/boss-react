const express = require("express");
const utils = require('utility');
const Router = express.Router();

const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd': 0, '__v': 0}; //过滤条件


//查找用户合集
Router.get('/list', function (req, res) {
    //User.remove({},function (e,d) {});
    const {type} = req.query;
    //查找user实体
    User.find({type}, _filter, function (err, doc) {
        return res.json({code: 0, data: doc});
    })
});

// 根据uid获取指定用户详细信息
Router.get('/info', function (req, res) {
    checkUser(req, res, function (userid) {
        User.findOne({_id: userid}, _filter, function (err, doc) {
            if (err)
                return res.json({code: "1", msg: "/info后台查询错误" + err.toString()})
            return res.json({code: '0', data: doc});
        })
    })
})


//更新用户信息
Router.post('/update', function (req, res) {
    checkUser(req, res, function (userid) {
        const body = req.body;
        User.findByIdAndUpdate(userid, body, function (err, doc) {
            const data = Object.assign({}, {
                name: doc.name,
                type: doc.type
            }, body);
            return res.json({code: 0, data});
        });
    })
})

//检查用户
function checkUser(req, res, callBackFn) {
    const userid = req.cookies.userid;
    if (!userid)
        return res.json({code: 1});
    callBackFn && callBackFn(userid);
}

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
            res.cookie('userid', _id);
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