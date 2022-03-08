const nodemailer = require('nodemailer')

const reansporter = nodemailer.createTransport
(
    {
        service: "hotmail",
        auth:
        {
            user: "ac.creed1@outlook.fr",
            pass:"Creed274!",
        }
    }
)

const options = {
    $from: "ac.creed1@outlook.fr",
    to: "daaouabdessamed@gmail.com",
    subject: "email envoyé par node js",
    text: "c'est quoi cette merde"
}

transporter.sendMail(options, (err, info) =>
    {
        if(err)
        {
            console.log(err);
            return;
        }
        else
        {
            console.log("sent : " + info.response);
        }
    })