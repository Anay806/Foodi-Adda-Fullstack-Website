import nodemailer from 'nodemailer'
import 'dotenv/config'

export const sendOTPMail = async (otp, email) => {

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
    subject: "Password Reset OTP",
    html: `<p>Your OTP for password reset is: <b>${otp} </b> </p>`

  };
  transporter.sendMail(mailConfiguration, function (error, info) {
    if (error) throw Error(error);
    console.log('OTP sent Successfully');
    console.log(info)
  });

}

