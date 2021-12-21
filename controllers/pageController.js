const getIndexPage = (req,res) => {
    console.log(req.session.userID);
    res.render('index',{
        pageName:'index'
    })
};

const getAboutPage = (req,res) => {
    res.render('about',{
        pageName:'about'
    })
};

const getRegisterPage = (req,res) => {
    res.render('register',{
        pageName:'register'
    })
}

const getLoginPage = (req,res) =>{
    res.render('login',{
        pageName:'login'
    })
}


module.exports = {
    getIndexPage,
    getAboutPage,
    getRegisterPage,
    getLoginPage
}