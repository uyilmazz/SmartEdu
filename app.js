const express = require('express');

const app = express();

//Template Engine
app.set('view engine','ejs');

//Middleware
app.use(express.static('public'));

//Routers
app.get('/',(req,res)=>{
   res.render('index',{
       pageName : 'index'
   })
});

app.get('/about',(req,res) => {
    res.render('about',{
        pageName:'about'
    })
});

const port = 3000;

app.listen(port,() => {
    console.log(`Server initialized from ${port} port`);
});