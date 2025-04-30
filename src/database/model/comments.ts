import { DataTypes, Model, Optional } from 'sequelize';
import dotenv from 'dotenv';
import sequelizeConnection from '../config';

dotenv.config();

interface CommentsAttributes {
  id: number;
  user_id: number;
  post_id: number;
  likes: number;
  dislikes: number;
  reaction_id: number;
  is_deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CommentsInput extends Optional<CommentsAttributes, 'id'> {}
export interface CommentsOutput extends Required<CommentsAttributes> {}

class Comments extends Model<CommentsAttributes, CommentsInput> implements CommentsAttributes {
  public id!: number;
  public user_id!: number;
  public post_id!: number;
  public likes!: number;
  public dislikes!: number;
  public reaction_id!: number;
  public is_deleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    reaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
  }
);

export default Comments;