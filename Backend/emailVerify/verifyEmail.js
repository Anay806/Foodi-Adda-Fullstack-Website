import nodemailer from 'nodemailer'
import 'dotenv/config'

export const verifyEmail = (token, email) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailConfiguration = {
    // it should be string of sender/server mail
    from: process.env.MAIL_USER,
    to: email,
    //Subject of Email
    subject: "Email Verification",
    //this would be the text of email body
    text: `Hii Anay How are you men , What about you? , i will meet you next monday at the Rajmahel hotel, if you want also so please contract me to throw of this LINK http://localhost:5173/verify/${token}Thanks Bro`

  };
  transporter.sendMail(mailConfiguration, function (error, info) {
    if (error) throw Error(error);
    console.log('Email sent Successfully');
    console.log(info)
  });

}

