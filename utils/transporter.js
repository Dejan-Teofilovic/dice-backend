const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SERVER_EMAIL_NAME,
    pass: process.env.SERVER_EMAIL_PASSWORD
  }
});

module.exports = transporter;