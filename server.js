var http=require('http');
var path=require('path')
const cookieParser=require('cookie-parser');
const session = require('express-session')
const express=require('express');
const bodyParser=require("body-parser");
var mongoUtil=require('./mongoUtil.js')
const appUtil=require('./appUtil.js');
var handlebars = require('express-handlebars');
var dateFormatHelper=require('./helpers/dateFormat.js');
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
var profileRouter=require("./routers/profile/profileRouter.js");
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
    partialsDir : path.join(__dirname,'/views/partial'),
    helpers :{
        dateFormatHelper
    }
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
app.use('/profile',profileRouter);
app.use('/home',profileRouter);
app.listen(8081,function(){
    console.log("Server running on 8081");
})