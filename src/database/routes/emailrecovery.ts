import express from 'express';
import nodemailer from 'nodemailer';
import { Op } from 'sequelize';
import RecoveryModel from "../model/emailrecovery";
import users from "../model/users";
import dotenv from 'dotenv';

dotenv.config();
const emailrecovery = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mailto:achsahsruthi786@gmail.com",
    pass: "ykbh zsod oxxw dzmj"
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

emailrecovery.post('/usernamerecoveryemail', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  users.findOne({ where: { email } }).then(user => {
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not connected with any username' });
    }

    const otp = generateOTP();
    const expiration_time = new Date(new Date().getTime() + 10 * 60000); // OTP expires in 10 minutes

    const createRecoveryModelObject = {
      user_id: user.dataValues.user_id.toString(), // Ensure user_id is a string
      email,
      otp,
      expired_at: expiration_time,
      created_at: new Date(),
      updated_at: new Date(),
    };

    RecoveryModel.create(createRecoveryModelObject).then(() => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Username Recovery',
        text: `Your recovery OTP is ${otp}. It will expire in 10 minutes.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Failed to send recovery email:', error);
          return res.status(500).json({ success: false, message: 'Failed to send recovery email' });
        }
        console.log('Recovery email sent:', info.response);
        res.json({ success: true, message: 'Recovery email sent successfully' });
      });
    }).catch(error => {
      console.error('Error creating recovery OTP:', error);
      res.status(500).json({ success: false, message: 'Error creating recovery OTP' });
    });
  }).catch(error => {
    console.error('Error finding user:', error);
    res.status(500).json({ success: false, message: 'Error finding user' });
  });
});

emailrecovery.post('/validate-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }

  users.findOne({ where: { email } }).then(user => {
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not connected with any username' });
    }

    RecoveryModel.findOne({
      where: {
        user_id: user.dataValues.user_id.toString(), // Ensure user_id is a string
        email,
        otp,
        expired_at: {
          [Op.gt]: new Date(),
        },
      },
    }).then(recovery => {
      if (recovery) {
        sendUsernameToEmail(email, user.dataValues.user_name).then(emailResponse => {
          if (emailResponse.success) {
            res.json({ success: true, message: 'OTP verified successfully, username sent to email.', username: user.dataValues.user_name });
          } else {
            res.status(500).json({ success: false, message: 'OTP verified but failed to send username to email.' });
          }
        }).catch(error => {
          console.error('Error sending username to email:', error);
          res.status(500).json({ success: false, message: 'Error sending username to email.' });
        });
      } else {
        res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      }
    }).catch(error => {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ success: false, message: 'Error verifying OTP' });
    });
  }).catch(error => {
    console.error('Error finding user:', error);
    res.status(500).json({ success: false, message: 'Error finding user' });
  });
});

emailrecovery.post('/resend-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  users.findOne({ where: { email } }).then(user => {
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not connected with any username' });
    }

    const otp = generateOTP();
    const expiration_time = new Date(new Date().getTime() + 10 * 60000); // OTP expires in 10 minutes

    RecoveryModel.destroy({
      where: { user_id: user.dataValues.user_id.toString() } // Ensure user_id is a string
    }).then(() => {
      const createRecoveryModelObject = {
        user_id: user.dataValues.user_id.toString(), // Ensure user_id is a string
        email,
        otp,
        expired_at: expiration_time,
        created_at: new Date(),
        updated_at: new Date(),
      };

      RecoveryModel.create(createRecoveryModelObject).then(() => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Username Recovery',
          text: `Your new recovery OTP is ${otp}. It will expire in 10 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Failed to send recovery email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send recovery email' });
          }
          console.log('Recovery email sent:', info.response);
          res.json({ success: true, message: 'Recovery email sent successfully' });
        });
      }).catch(error => {
        console.error('Error creating recovery OTP:', error);
        res.status(500).json({ success: false, message: 'Error creating recovery OTP' });
      });
    }).catch(error => {
      console.error('Error deleting old OTP:', error);
      res.status(500).json({ success: false, message: 'Error deleting old OTP' });
    });
  }).catch(error => {
    console.error('Error finding user:', error);
    res.status(500).json({ success: false, message: 'Error finding user' });
  });
});

export const sendUsernameToEmail = async (email: string, username: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Username',
    text: `Your username is: ${username}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Username sent to email successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to send username to email.' };
  }
};

export default emailrecovery;
