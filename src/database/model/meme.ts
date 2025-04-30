import { DataTypes, Model, Optional } from 'sequelize';
import dotenv from 'dotenv';
import sequelizeConnection from '../config';

dotenv.config();

// Define the attributes for the Meme model
interface MemeAttributes {
  user_id: number;
  user_name: string;
  name: string;
  likes: number;
  dislikes: number;
  comments: string;
  is_deleted: boolean;
  soft_delete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Define the input and output types for the Meme model
export interface MemeInput extends Optional<MemeAttributes, 'user_id'> {}
export interface MemeOutput extends Required<MemeAttributes> {}

// Define the Meme model class
class Meme extends Model<MemeAttributes, MemeInput> implements MemeAttributes {
  public user_id!: number;
  public user_name!: string;
  public name!: string;
  public likes!: number;
  public dislikes!: number;
  public comments!: string;
  public is_deleted!: boolean;
  public soft_delete!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

// Initialize the Meme model
Meme.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    soft_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true, // Enables soft delete
    sequelize: sequelizeConnection,
  }
);

export default Meme;