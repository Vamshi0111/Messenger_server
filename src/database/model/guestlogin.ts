import { DataTypes, Model, Optional } from "sequelize";
import * as dotenv from 'dotenv';
import sequelizeConnection from "../config";

dotenv.config();

interface GuestUserAttributes {
  user_id: number;
  guest_name: string;
  age: number;
  Active: boolean;
  soft_delete: boolean;
  created_At?: Date;
  updated_At?: Date;
  deleted_At?: Date;
}

export interface GuestUserInput extends Optional<GuestUserAttributes, "user_id"> {}
export interface GuestUserOutput extends Required<GuestUserAttributes> {}

class GuestUser extends Model<GuestUserAttributes, GuestUserInput> implements GuestUserAttributes {
  public user_id!: number;
  public guest_name!: string;
  public age!: number;
  public Active!: boolean;
  public soft_delete!: boolean;
  public readonly created_At!: Date;
  public readonly updated_At!: Date;
  public readonly deleted_At!: Date;
}

GuestUser.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    guest_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: {
          args: /^[a-zA-Z][a-zA-Z0-9]*$/,
          msg: "User name must start with a letter and can contain only alphanumeric characters.",
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 14,
        max: 100,
        isInt: true,
      },
    },
    Active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    soft_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    modelName: "GuestUser",
  }
);

export default GuestUser;
