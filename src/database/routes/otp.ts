import express from 'express';
import nodemailer from 'nodemailer';
import { generateOTP, storeOtp, getOtp, deleteOtp } from '../model/otp';
import { Op } from 'sequelize';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mailto:achsahsruthi786@gmail.com",
    pass: "ykbh zsod oxxw dzmj"  // Use environment variables for security
  },
});

const maskEmail = (email: any) => {
  const [name, domain] = email.split('@');
  const maskedName = name.slice(0, 3) + '**********';
  return maskedName + '@' + domain;
};

router.post('/otpgen', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const user_id = email;
  const otp_code = generateOTP();
  await storeOtp(user_id, otp_code);

  const mailOptions = {
    from: "mailto:achsahsruthi786@gmail.com",
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp_code}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send OTP email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
    console.log('OTP email sent:', info.response);
    res.json({ success: true, message: 'OTP sent successfully', maskedEmail: maskEmail(email) });
  });
});

router.post('/validate-otp', async (req, res) => {
  const { email, otp_code } = req.body;

  if (!email || !otp_code) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
  }

  const user_id = email;
  const otp = await getOtp(user_id);

  if (otp && otp.otp_code === otp_code) {
    await deleteOtp(user_id);
    return res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const user_id = email;
  const otp_code = generateOTP();
  await storeOtp(user_id, otp_code);

  const mailOptions = {
    from: "mailto:achsahsruthi786@gmail.com",
    to: email,
    subject: 'Your Resent OTP Code',
    text: `Your new OTP code is ${otp_code}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to resend OTP email:', error);
      return res.status(500).json({ success: false, message: 'Failed to resend OTP' });
    }
    console.log('Resent OTP email sent:', info.response);
    res.json({ success: true, message: 'OTP resent successfully', maskedEmail: maskEmail(email) });
  });
});

// New endpoint for entering and verifying the resent OTP
router.post('/verify-resend-otp', async (req, res) => {
  const { email, otp_code } = req.body;

  if (!email || !otp_code) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
  }

  const user_id = email;
  const otp = await getOtp(user_id);

  if (otp && otp.otp_code === otp_code) {
    await deleteOtp(user_id);
    return res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

export default router;
