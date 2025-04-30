import { DataTypes, Model, Optional } from 'sequelize';
import * as dotenv from 'dotenv';
import sequelizeConnection from '../config';

dotenv.config();

// Interface for the model attributes
interface FeedbackAttributes {
    id: number;
    user_id: number;
    user_name: string;
    rating: number;
    review: string;
    is_deleted: boolean;
    Active: boolean;
    soft_delete: boolean;

    created_At?: Date;
    updated_At?: Date;
    deleted_At?: Date;
}

// Optional attributes for creating a new record
export interface FeedbackInput extends Optional<FeedbackAttributes, 'id'> {}

// Required attributes for fetching records
export interface FeedbackOutput extends Required<FeedbackAttributes> {}

// Sequelize model definition
class Feedback extends Model<FeedbackAttributes, FeedbackInput> implements FeedbackAttributes {
    public id!: number;
    public user_id!: number;
    public user_name!: string;
    public rating!: number;
    public review!: string;
    public is_deleted!: boolean;
    public Active!: boolean;
    public soft_delete!: boolean;

    // Used for timestamps
    public readonly created_At!: Date;
    public readonly updated_At!: Date;
    public readonly deleted_At!: Date;
}

// Initialize the model with Sequelize
Feedback.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Name of the table in the database
            key: 'user_id'       // Primary key of the referenced table
        }
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    Active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    soft_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: 'feedback' // Ensure this matches your database schema
});

// Define associations if necessary
// import User from './path-to-user-model'; // Adjust the path to the User model

// Feedback.belongsTo(User, { foreignKey: 'user_id' });
// User.hasMany(Feedback, { foreignKey: 'user_id' });

export default Feedback;
