import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
});

function sendVerificationEmail(userEmail: string, verificationLink: string, res: any) {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: userEmail,
      subject: 'Email Verification',
      text: `Click the link to verify your email: ${verificationLink}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Email not sent' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  }

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export { sendVerificationEmail };
