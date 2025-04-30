import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
import users from './users'; 


interface FriendRequestAttributes {
    request_id: number;
    sender_id: number;
    receiver_id: number;
    status: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface FriendRequestInput extends Optional<FriendRequestAttributes, "request_id"> {}

export interface FriendRequestOutput extends Required<FriendRequestAttributes> {}

class FriendRequest extends Model<FriendRequestAttributes, FriendRequestInput> implements FriendRequestAttributes {
    public request_id!: number;
    public sender_id!: number;
    public receiver_id!: number;
    public status!: string;

    // timestamps
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at!: Date;
}

FriendRequest.init({
    request_id: {
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
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['pending', 'accepted', 'rejected']]
        }
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: 'friend_requests'
});
FriendRequest.init({
  request_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['pending', 'accepted', 'rejected']],
    },
  },
}, {
  sequelize: sequelizeConnection,
  tableName: 'friend_requests',
  timestamps: true,
  paranoid: true,
});

FriendRequest.belongsTo(users, { as: 'Sender', foreignKey: 'sender_id' });
FriendRequest.belongsTo(users, { as: 'Receiver', foreignKey: 'receiver_id' });

export default FriendRequest;
