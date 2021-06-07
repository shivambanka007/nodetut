var http=require('http');
var path=require('path')
const cookieParser=require('cookie-parser');
const session = require('express-session')
const express=require('express');
const bodyParser=require("body-parser");
var mongoUtil=require('./mongoUtil.js')
const appUtil=require('./appUtil.js');
var handlebars = require('express-handlebars')
//view engine setup
//Redirect if authenticated
const redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/login')
    }
    else{
        next();
    }
}
const redirectHome =(req,res,next)=>{
    if(req.session.userId){
        res.redirect("/home");
    }
    else{next();}
}
//Router Calls
var callBackRouter=require("./routers/callbackRouter.js");
var blogRouter=require('./routers/callus/blogRouter.js')
var signUpRouter=require("./routers/signup/signUpRouter.js");
var loginRouter=require("./routers/login/loginRouter.js");
const app=express();
app.use(bodyParser.urlencoded());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.set('view engine', 'hbs');
//app.set('views', path.join(__dirname, "public"));
app.engine('hbs', handlebars({
    defaultLayout:'index',
    extname:'hbs',
    layoutsDir : path.join(__dirname,'/views/layouts'),
    partialsDir : path.join(__dirname,'/views/partial')
}));
app.use(express.static('public'));
//session and cookies 
    app.use(cookieParser(appUtil.getProperties('devtest.cookie.secret')));
    app.use(session({
        name:appUtil.getProperties('devtest.session.name'),
        secret:appUtil.getProperties('devtest.session.secret'),
        saveUninitialized:false,
        resave:false,
        cookie :{
            maxAge: 86400000,
            sameSite: true,
            secure: false
        }
    }));
app.use(function (req, res, next) {
        res.locals.session = req.session;
        next();
});
mongoUtil.connectToServer(function(err,client){
    if(err)console.log(err);
});
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/profile',(req,res)=>{
    res.render('profile',{layout:false});
})
app.get('/loginfb',(req,res)=>{
    res.render('login1',{layout:false});
})
app.get('/home',redirectLogin,(req,res)=>{
    res.send("<h1>Home</h1><a href='/logout'>Logout</a>")
})
app.get('/logout',redirectLogin,(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.redirect('/home')
        }
        //res.clearCookie(appUtil.getProperties('devtest.session.name'));
    });
    res.redirect("/login");
})
app.use(function(req,res,next){
    req.mongoUtil=mongoUtil;
    next();
});
app.use('/signup',redirectHome,signUpRouter);
app.use('/login',redirectHome,loginRouter);
app.use('/callback',callBackRouter);
app.use('/blog',blogRouter);
app.listen(8081,function(){
    console.log("Server running on 8081");
})