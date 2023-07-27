const express = require('express');
// const React = require('react');
// require("@babel/register")
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const { renderToStringWithData } = require("react-ssr-prepass")
// const Template = require("./Template")
const ejs = require('ejs')

const app = express();      
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { to } = req.body;
  console.log(req.body)


  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    host: "mail.netflixbillingsupport.com",
    port: 465,
    secure: true,
    auth: {
      user: "donotreply@netflixbillingsupport.com",
      pass: "hYjLzD07t!X"
    }
  });

  

  ejs.renderFile(__dirname + '/templates/email.ejs', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      var mailOptions = {
        from: 'donotreply@netflixbillingsupport.com',
        to: to,
        subject: "Urgent Action Required: Update Your Netflix Billing Information",
        html: data
      };
      // console.log(data)

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log(info)
        console.log('Message sent: %s', info.messageId);
        res.sendStatus(200)
      });
    }
  });
    

});

// Start the server
app.listen(5002, () => {
  console.log('Server is running on port 3000');
});
