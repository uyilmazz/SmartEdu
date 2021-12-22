const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();

const pageRouter = require('./routers/pageRoute');
const courseRouter = require('./routers/courseRoute');
const categoryRouter = require('./routers/categoryRoute');
const userRouter = require('./routers/userRoute');

//DB connect
mongoose.connect('mongodb://localhost/smart-edu')
.then(_ => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECT ERROR ' + err));

//Template Engine
app.set('view engine','ejs');

global.userIN = null;

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret: 'my_session_key',
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smart-edu' }),
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
app.use((req,res,next) => {
    res.locals.validation_errors = req.flash('validation_error');
    res.locals.success_message = req.flash('success_message');
    res.locals.name = req.flash('name');
    res.locals.email = req.flash('email');
    res.locals.password = req.flash('password');
    next();
});
app.use(methodOverride('_method',{
    methods:[
        'POST','GET'
    ]
}));

//Routers
app.use('*',(req,res,next) => {
    userIN = req.session.userID;
    next();
})
app.use('/',pageRouter);
app.use('/courses',courseRouter);
app.use('/categories',categoryRouter);
app.use('/users',userRouter);

const port = 3000;

app.listen(port,() => {
    console.log(`Server initialized from ${port} port`);
});