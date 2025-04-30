import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../config";

interface MessageAttributes {
    message_id: number;
    sender_id: number;
    message_type: string;
    status: string;
    is_deleted: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

class Message extends Model<MessageAttributes> implements MessageAttributes {
    public message_id!: number;
    public sender_id!: number;
    public message_type!: string;
    public status!: string;
    public is_deleted!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at!: Date;
}

Message.init({
    message_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    sequelize: sequelizeConnection,
    modelName: 'Message',
    timestamps: true,
    paranoid: true
});

export default Message;
