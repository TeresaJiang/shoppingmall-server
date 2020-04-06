var createError = require('http-errors');
var express = require('express');//导入express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//导入routes模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
//实例化express为app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置全局拦截
app.use(function(req,res,next){
    if(req.cookies.userId){//userId 存在，也就是登录了，那就不拦截继续执行
        console.log("登录");
        next();
    }else{
        /*
        * userId 不存在，也就是没有登录了
        * 这个时候 让不登录的接口 能继续调用，其他的一切接口全部禁用，这样就实现了，没有登录什么都调用不了
        * req.originalUrl 当前接口地址
        * goods 作介绍，查询商品的时候，后边会与很多的参数，第几页多少数据排序等等这个时候，req.originalUrl 就不行了，这个获取不到后边的参数
        * 有两种方法
        * 1、req.originalUrl.indexOf('/goods') > -1
        * 2、获取不带参数的 url 地址 req.path 
        */ 
        if(req.originalUrl=='/users/login'||req.originalUrl=='/users/logout'||req.path=="/goods/list"){
            next();
        }else{
            console.log("拦截");
            res.json({
                status:'10001',
                msg:'当前未登录',
                result:''
            })
        }
    }
  

})

//app.use统一管理路由，app.use里对应一级路由，routes里对应二级路由
app.use('/', indexRouter);//默认加载此路由
app.use('/users', usersRouter);
app.use('/goods', goodsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
