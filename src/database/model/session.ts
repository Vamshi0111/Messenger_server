import { DataTypes, Model, Optional } from 'sequelize';
import dotenv from 'dotenv';
import sequelizeConnection from '../config';

dotenv.config();

interface SessionAttributes {
  session_id: string;
  user_id: number;
  expires_at: Date;
  session_token: string;
  createdAt?: Date;
}

export interface SessionInput extends Optional<SessionAttributes, 'session_id'> {}
export interface SessionOutput extends Required<SessionAttributes> {}

class Session extends Model<SessionAttributes, SessionInput> implements SessionAttributes {
  public session_id!: string;
  public user_id!: number;
  public expires_at!: Date;
  public session_token!: string;
  public readonly createdAt!: Date;
}

Session.init(
  {
    session_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export default Session;
