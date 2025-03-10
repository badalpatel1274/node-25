const mailer = require('nodemailer')

const sendingMail = async (to,subject,text) =>{

    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"resume.x12@gmail.com",
            pass:"vucp agju vlug mpwz"
        }
    })

    const mailOptions = {
        from:"resume.x12@gmail.com",
        to:to,
        subject:subject,
        text:text
    }

    const mailresponse = await transporter.sendMail(mailOptions)
    console.log(mailresponse);
    return mailresponse
    
}

module.exports={
    sendingMail
}