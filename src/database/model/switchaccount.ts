import { DataTypes, Model, Optional } from 'sequelize';
import * as dotenv from 'dotenv';
import sequelizeConnection from '../config'; // Adjust path as needed

dotenv.config();

interface SwitchAccountsAttributes {
    switchaccounts_id: number;
    user_id: number;
    linked_account_id: number;
    created_at?: Date;
}


export interface SwitchAccountsInput extends Optional<SwitchAccountsAttributes, 'switchaccounts_id'> {}
export interface SwitchAccountsOutput extends Required<SwitchAccountsAttributes> {}

class SwitchAccounts extends Model<SwitchAccountsAttributes, SwitchAccountsInput> implements 
SwitchAccountsAttributes {
    public switchaccounts_id!: number;
    public user_id!: number;
    public linked_account_id!: number;
    public created_at?: Date;
}

SwitchAccounts.init(
    {
        switchaccounts_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            }
        },
        linked_account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        timestamps: false, // If you are managing created_at manually
        sequelize: sequelizeConnection,
        modelName: 'SwitchAccounts',
        tableName: 'switchaccounts',
    }
);

export default SwitchAccounts;
