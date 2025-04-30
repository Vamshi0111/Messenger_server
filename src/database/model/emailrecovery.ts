import { DataTypes, Model, Optional, Op } from 'sequelize';
import dotenv from 'dotenv';
import sequelizeConnection from '../config';
import users from './users';


dotenv.config();

// Model Definition
interface RecoveryAttributes {
  id: number;
  user_id: string;
  email: string;
  otp: string;
  created_at: Date;
  updated_at: Date;
  expired_at: Date;
}

export interface RecoveryInput extends Optional<RecoveryAttributes, 'id'> {}
export interface RecoveryOutput extends Required<RecoveryAttributes> {}

class RecoveryModel extends Model<RecoveryAttributes, RecoveryInput> implements RecoveryAttributes {
  public id!: number;
  public user_id!: string;
  public email!: string;
  public otp!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public expired_at!: Date;
}

RecoveryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'RecoveryModels',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default RecoveryModel;

// Helper Functions for OTP operations

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

export const storeOtp = async (user_id: string, email: string, otp_code: string) => {
  const expiration_time = new Date(new Date().getTime() + 10 * 60000); // OTP expires in 10 minutes
  const otp = await RecoveryModel.create({
    user_id,
    email,
    otp: otp_code,
    expired_at: expiration_time,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return otp;
};

export const getOtp = async (user_id: string) => {
  const otp = await RecoveryModel.findOne({
    where: {
      user_id,
      expired_at: {
        [Op.gt]: new Date(),
      },
    },
  });
  return otp;
};

export const deleteOtp = async (user_id: string) => {
  await RecoveryModel.destroy({
    where: {
      user_id,
    },
  });
};

export const resendOtp = async (user_id: string, email: string) => {
  await deleteOtp(user_id); // Clear existing OTPs for the user
  const otp_code = generateOTP();
  const otp = await storeOtp(user_id, email, otp_code);
  return otp;
};

export const validateAndSubmitOtp = async (user_id: string, otp_code: string) => {
  const otp = await RecoveryModel.findOne({
    where: {
      user_id,
      otp: otp_code,
      expired_at: {
        [Op.gt]: new Date(),
      },
    },
  });



if (otp) {
  const user = await users.findOne({ where: { user_id: user_id.toString() } });
  if (user) {
    const emailResponse = await sendUsernameToEmail(user.email, user.user_name);
    if (emailResponse.success) {
      return { success: true, message: 'OTP verified and username sent to email successfully.' };
    } else {
      return { success: false, message: 'OTP verified but failed to send username to email.' };
    }
  } else {
    return { success: false, message: 'User not found.' };
  }
} else {
  return { success: false, message: 'Invalid or expired OTP.' };
}
};

// Simulated email sending function (replace with actual implementation)
const sendUsernameToEmail = async (email: string, username: string) => {
// Simulate sending email
console.log(`Email sent to ${email} with username: ${username}`);
return { success: true };
};