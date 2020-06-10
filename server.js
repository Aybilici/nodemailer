require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my api');
});

app.post('/send', (req, res) => {
  var data = req.body;

  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    debug: true,
  });

  var mailOptions = {
    from: data.email,
    to: 'abdulhakbilici@gmail.com',
    subject: 'ENTER_YOUR_SUBJECT',
    attachments: [
      {
        // utf-8 string as an attachment
        filename: data.file,
        path: `./${data.file}`,
      },
    ],
    html: `<p>${data.name}</p>
              <p>${data.email}</p>
              <p>${data.message}</p>
              ${data.file}`,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
      console.log(data.file);
    } else {
      res.send('Success');
      console.log(data.file);
    }
    smtpTransport.close();
  });
});

app.listen(4444, () => console.log('Server Started...'));
