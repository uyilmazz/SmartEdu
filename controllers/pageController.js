const nodemailer = require("nodemailer");

const getIndexPage = (req, res) => {
    res.render('index', {
        pageName: 'index'
    })
};

const getAboutPage = (req, res) => {
    res.render('about', {
        pageName: 'about'
    })
};

const getRegisterPage = (req, res) => {
    res.render('register', {
        pageName: 'register'
    })
}

const getLoginPage = (req, res) => {
    res.render('login', {
        pageName: 'login'
    })
}

const getContactPage = (req, res) => {
    res.render('contact', {
        pageName: 'contact'
    });
};


const sendEmail = async (req, res) => {
    try {
        const outputMessage = `
    <h1>Detail</h1>
    <ul> 
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'deneme132132132@gmail.com', // generated ethereal user
                pass: 'deneme132', // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Smart Edu From" <deneme132132132@gmail.com>', // sender address
            to: `deneme132132132@gmail.com`, // list of receivers
            subject: "Smart Edu Contach form new Message", // Subject line
            html: outputMessage, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        req.flash('success_message', [{msg:'We Received your message succesfully'}]);
        res.redirect('/contact');

    } catch (err) {
        req.flash('validation_error', [{msg:'Something happened!'}]);
        res.redirect('/contact');
    }
};

module.exports = {
    getIndexPage,
    getAboutPage,
    getRegisterPage,
    getLoginPage,
    getContactPage,
    sendEmail
}