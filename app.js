const express = require('express');
const mongoose = require('mongoose');

const app = express();

const pageRouter = require('./routers/pageRoute');
const courseRouter = require('./routers/courseRoute');

//DB connect
mongoose.connect('mongodb://localhost/smart-edu')
.then(_ => console.log('DB CONNECTED'))
.catch(err => console.log('DB CONNECT ERROR ' + err));

//Template Engine
app.set('view engine','ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Routers
app.use('/',pageRouter);
app.use('/courses',courseRouter);

const port = 3000;

app.listen(port,() => {
    console.log(`Server initialized from ${port} port`);
});