const nodemailer = require("nodemailer");

const maildaemonEmail = process.env.maildaemonEmail
const maildaemonPassword = process.env.maildaemonPassword

// To set up an SMTP connection, we have to create atransporter object, by calling nodemailer’s createTransport function
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: maildaemonEmail,
      pass: maildaemonPassword,
    },
  });


module.exports.sendConfirmationEmail = (name, email, confirmationCode, otp, username) => {
console.log("Check");
transport.sendMail({
    from: name,
    to: email,
    subject: "Welcome to InfraCredit Transaction Reporting System",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${username}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/api/v1/staff/confirm/${confirmationCode}> Click here</a>
        <p>Please login with your Email: ${email} with One-Time-Password: <strong> ${otp} </strong></p>
        </div>`,
}).catch(err => console.log(err));
};