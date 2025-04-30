// src/model/Conversations.ts

import { DataTypes, Model, Optional } from 'sequelize';
import * as dotenv from 'dotenv';
import sequelizeConnection from '../config';

dotenv.config();

interface ConversationAttributes {
  conversation_id: number;
  user1_id: number;
  user2_id: number;
  status: string;
  start_time: Date;
  end_time?: Date;
}

export interface ConversationInput extends Optional<ConversationAttributes, "conversation_id"> {}

export interface ConversationOutput extends Required<ConversationAttributes> {}

class Conversation extends Model<ConversationAttributes, ConversationInput>
  implements ConversationAttributes {
  public conversation_id!: number;
  public user1_id!: number;
  public user2_id!: number;
  public status!: string;
  public start_time!: Date;
  public end_time?: Date;
}

Conversation.init(
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'Conversations',
    timestamps: false,
    sequelize: sequelizeConnection,
  }
);

export { Conversation };
