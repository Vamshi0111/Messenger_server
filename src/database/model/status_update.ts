import { DataTypes,Model,Optional } from "sequelize";

import * as dotenv from 'dotenv';
import sequelizeConnection from "../config";
import { BOOLEAN } from "sequelize";

dotenv.config();

interface status_updateAttributes {
    status_id : number;
    user_id : number;
   content : string;
   is_deleted : Boolean;

    created_At ?: Date;
    updated_At ?: Date;
    deleted_At ?: Date;
}

export interface status_updateInput extends Optional<status_updateAttributes, "user_id"> {}

export interface status_updateOutput extends Required<status_updateAttributes> {}


class status_update extends Model <status_updateAttributes, status_updateInput> implements

status_updateAttributes {
    public user_id! : number;
   public status_id!: number;
   public content!: string;
  public is_deleted!: Boolean;

    // used for timestamps
    public readonly created_At!: Date;
    public readonly updated_At!: Date;
    public readonly deleted_At!: Date;

}

status_update.init({
        status_id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false,
            unique:true
        },

        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false   
            },
 
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_deleted : {
        type: DataTypes.BOOLEAN,
        defaultValue : false,
    },
    
},
    {
    timestamps:true,
    paranoid:true,
    sequelize:sequelizeConnection
})

export default status_update;
  