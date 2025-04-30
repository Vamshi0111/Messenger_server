import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface NotificationAttributes {
    notification_id: number;
    user_id: number;
    user_name: string;
    notification_sounds: boolean;
    push_notifications: boolean;
    pm_setting: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface NotificationInput extends Optional<NotificationAttributes, "notification_id"> {}

export interface NotificationOutput extends Required<NotificationAttributes> {}

class Notification extends Model<NotificationAttributes, NotificationInput> implements NotificationAttributes {
    public notification_id!: number;
    public user_id!: number;
    public user_name!: string;
    public notification_sounds!: boolean;
    public push_notifications!: boolean;
    public pm_setting!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Notification.init({
    notification_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notification_sounds: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    push_notifications: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    pm_setting: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'chat_notifications'
});

export default Notification;
