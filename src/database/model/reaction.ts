import { DataTypes,Model,Optional } from "sequelize";

import * as dotenv from 'dotenv';
import sequelizeConnection from "../config";

dotenv.config();

interface reactionAttributes {
    id : number;
    reaction_type : number;
    user_id : number;
    image_url : string;
    is_deleted : boolean;

    created_At ?: Date;
    updated_At ?: Date;
    deleted_At ?: Date;
}

export interface reactionInput extends Optional<reactionAttributes, "user_id"> {}

export interface reactionOutput extends Required<reactionAttributes> {}


class reaction extends Model <reactionAttributes, reactionInput> implements

reactionAttributes {
    public id!: number;
    public user_id! : number;
   public reaction_type!: number;
   public image_url!: string;
    public is_deleted!: boolean;
    

    // used for timestamps
    public readonly created_At!: Date;
    public readonly updated_At!: Date;
    public readonly deleted_At!: Date;

}

reaction.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    reaction_type:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
    },
    user_id : {
        type : DataTypes.INTEGER,
    },
    image_url : {
        type: DataTypes.STRING,
    },

    
    is_deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    
   
},
    {
    timestamps:true,
    paranoid:true,
    sequelize:sequelizeConnection
})

export default reaction;
