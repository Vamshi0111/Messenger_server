import { DataTypes, Model, Optional } from 'sequelize';
import * as dotenv from 'dotenv';
import sequelizeConnection from '../config';

dotenv.config();

interface RoomsScreenAttributes {
  room_id: number;
  room_name: string;
  room_password: string;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  is_deleted?: boolean;
  status?: string;
}

export interface RoomsScreenInput extends Optional<RoomsScreenAttributes,"room_id"> {}

export interface RoomsScreenOutput extends Required <RoomsScreenAttributes> {}

class RoomsScreen extends Model<RoomsScreenAttributes, RoomsScreenInput>
  implements RoomsScreenAttributes {
  public room_id!: number;
  public room_name!: string;
  public room_password!: string;
  public user_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public is_deleted?: boolean;
  public status?: string;
}

RoomsScreen.init(
  {
    room_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    room_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  },
  {
    tableName: 'RoomsScreen',
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export { RoomsScreen };

