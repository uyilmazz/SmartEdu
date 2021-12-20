const getIndexPage = (req,res) => {
    res.render('index',{
        pageName:'index'
    })
};

const getAboutPage = (req,res) => {
    res.render('about',{
        pageName:'about'
    })
};


module.exports = {
    getIndexPage,
    getAboutPage,
    
}