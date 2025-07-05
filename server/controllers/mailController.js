const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_HOST,
    pass: process.env.MAIL_PASS,
  },
});

async function sendWelcomeMail(to, username) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: "Welcome to Our System",
    text: `Hello ${username},\n\nYour account has been created successfully.\n\nThank you!`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeMail };
