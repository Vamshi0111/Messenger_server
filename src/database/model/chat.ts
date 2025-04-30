// src/database/model/chat.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config';

interface ChatAttributes {
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  message_text: string;
  user_id: number;
  user_name: string;
  is_deleted: boolean;
  deletedAt?: Date;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, 'chat_id' | 'deletedAt'> {}

class Chat extends Model<ChatAttributes, ChatCreationAttributes> implements ChatAttributes {
  public chat_id!: number;
  public sender_id!: number;
  public receiver_id!: number;
  public message_text!: string;
  public user_id!: number;
  public user_name!: string;
  public is_deleted!: boolean;
  public deletedAt?: Date;
}

Chat.init({
  chat_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  modelName: 'Chat',
  timestamps: false,
});

export default Chat;
export { ChatCreationAttributes };
