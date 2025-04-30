import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface VipMembershipAttributes {
    vip_id: number;
    user_id: number;
    status: string;
    start_date: Date;
    end_date: Date;
    vip_membership_level: string;
    benefits: string;
    created_at?: Date;
    updated_at?: Date;
   
}

export interface VipMembershipInput extends Optional<VipMembershipAttributes, "vip_id"> {}

export interface VipMembershipOutput extends Required<VipMembershipAttributes> {}

class VipMembership extends Model<VipMembershipAttributes, VipMembershipInput> implements VipMembershipAttributes {
    public vip_id!: number;
    public user_id!: number;
    public status!: string;
    public start_date!: Date;
    public end_date!: Date;
    public vip_membership_level!: string;
    public benefits!: string;
    

    
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

VipMembership.init({
    vip_id: {
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    vip_membership_level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    benefits: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
   
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName: 'vip_memberships'
});

export default VipMembership;
