const nodemailer = require("nodemailer");
const { email, password } = require("./config.js")

// async..await is not allowed in global scope, must use a wrapper
const mailer = async (recipient) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Matt 👻" <matt.belesiu@gmail.com>', // sender address
    to: recipient, // list of receivers
    subject: "It's Time to Update", // Subject line
    text: "It's time for you to make a new journal entry. Follow the link to login", // plain text body
    html: "<b>It's time for you to make a new journal entry. Follow the link to login</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

module.exports = mailer;
