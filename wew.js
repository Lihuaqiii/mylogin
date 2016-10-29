var express = require('express');
var path = require('path');
var app =express();
//1 ����ģ������
app.set('view engine','html');
//2.����ģ����Ŀ¼
app.set('views',path.resolve('views'));
//3 ������Ⱦ�ķ���
app.engine('.html',require('ejs').__express);
var bodyParser = require('body-parser');
var session = require('express-session');
//�����崦���м������������ת�ɶ������req.body��
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'zfpx'
}));
function checkLogin(req,res,next){
    if(req.session.username){
        next();
    }else{
        res.redirect('/login');
    }
}
app.get('/login',function(req,res){
    res.render('login');
});
app.post('/login',function(req,res){
    var user = req.body;//�õ�bodyParser���ݸ����ǵ�������
    if(user.username == user.password){
        req.session.username = user.username;//���û���д��session
        res.redirect('/user');//��ͻ������µ�·����������
    }
});

app.get('/user',checkLogin,function(req,res){
    res.render('user',{username:req.session.username});
});
app.listen(9090);