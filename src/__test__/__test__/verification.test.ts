import nodemailer, { SendMailOptions } from 'nodemailer';
import { sendVerificationEmail } from '../../routes/verification'; // Replace with the correct import path
import nock from 'nock';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe('sendVerificationEmail', () => {
  it('should send a verification email successfully', async () => {
    const userEmail = 'user@example.com';
    const verificationLink = 'http://yourapp.com/verify?token=unique_token';

    const sendMailMock = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    nock('http://yourapp.com')
      .get('/verify')
      .reply(200, 'Email verification successful');

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await sendVerificationEmail(userEmail, verificationLink, res);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining<SendMailOptions>({
        from: 'your_email@gmail.com',
        to: userEmail,
        subject: 'Email Verification',
        text: `Click the link to verify your email: ${verificationLink}`,
      }),
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email sent successfully' });
  });

  it('should handle email sending failure', async () => {
    const userEmail = 'user@example.com';
    const verificationLink = 'http://yourapp.com/verify?token=unique_token';

    const sendMailMock = jest.fn();
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: sendMailMock,
    });

    nock('http://yourapp.com')
      .get('/verify')
      .reply(500, 'Email verification failed');

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate an error in sending the email
    sendMailMock.mockImplementation((mailOptions, callback) => {
      callback(new Error('Email not sent'), null);
    });

    await sendVerificationEmail(userEmail, verificationLink, res);

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining<SendMailOptions>({
        from: 'your_email@gmail.com',
        to: userEmail,
        subject: 'Email Verification',
        text: `Click the link to verify your email: ${verificationLink}`,
      }),
      expect.any(Function)
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email not sent' });
  });
});