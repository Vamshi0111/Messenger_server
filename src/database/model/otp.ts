import { DataTypes, Model, Op, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (user_id: string, otp_code: string) => {
  const expiration_time = new Date(new Date().getTime() + 10 * 60000); // 10 minutes from now
  const otp = await otpModel.create({
    user_id,
    otp_code,
    expiration_time,
    verified_type: false,
    attempt_count: 0,
  });
  return otp;
};

export const getOtp = async (user_id: string) => {
  const otp = await otpModel.findOne({
    where: {
      user_id,
      expiration_time: {
        [Op.gt]: new Date(),
      },
    },
  });
  return otp;
};

export const deleteOtp = async (user_id: string) => {
  await otpModel.destroy({
    where: { user_id },
  });
};

export const resendOtp = async (user_id: string) => {
  await deleteOtp(user_id); // Clear existing OTPs for the user
  const otp_code = generateOTP();
  return await storeOtp(user_id, otp_code);
};

export const validateAndSubmitOtp = async (user_id: string, otp_code: string) => {
  const otp = await otpModel.findOne({
    where: {
      user_id,
      otp_code,
      expiration_time: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (otp) {
    if (otp.attempt_count < 3) {
      otp.attempt_count += 1;
      if (otp.otp_code === otp_code) {
        otp.verified_type = true;
        await otp.save();
        return { success: true, message: 'OTP verified successfully.' };
      } else {
        await otp.save();
        return { success: false, message: 'Invalid OTP code.' };
      }
    } else {
      return { success: false, message: 'OTP code attempt limit reached.' };
    }
  } else {
    return { success: false, message: 'OTP code expired or does not exist.' };
  }
};

interface otpAttributes {
  otp_id: number;
  user_id: string;
  otp_code: string;
  expiration_time: Date;
  verified_type: boolean;
  attempt_count: number;
  created_at?: Date;
}

export interface otpInput extends Optional<otpAttributes, 'otp_id'> {}
export interface otpOutput extends Required<otpAttributes> {}

class otpModel extends Model<otpAttributes, otpInput> implements otpAttributes {
  public otp_id!: number;
  public user_id!: string;
  public otp_code!: string;
  public expiration_time!: Date;
  public verified_type!: boolean;
  public attempt_count!: number;

  // timestamps
  public readonly created_at!: Date;
}

otpModel.init(
  {
    otp_id: {
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
    otp_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    verified_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    attempt_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: false,
    paranoid: true,
  }
);

export default otpModel;
