import { DataTypes,Model,Optional, WhereAttributeHashValue } from "sequelize";

import * as dotenv from 'dotenv';
import sequelizeConnection from "../config";

dotenv.config();

interface usersAttributes {
    user_id : number;
    user_name : string;
    name : string;
    date_of_birth : number;
    profile_picture_url : string;
    phone : string;
    password_hashed : string;
    is_deleted : boolean;
    email : string;
    Active : boolean;
    soft_delete : boolean;

    created_At ?: Date;
    updated_At ?: Date;
    deleted_At ?: Date;
}

export interface usersInput extends Optional<usersAttributes, "user_id"> {}

export interface usersOutput extends Required<usersAttributes> {}


class users extends Model <usersAttributes, usersInput> implements

usersAttributes {
  static email(email: any, user_name: any) {
    throw new Error('Method not implemented.');
  }
  static user_name(email: any, user_name: any) {
    throw new Error('Method not implemented.');
  }
    public user_id! : number;
    public user_name! : string;
    public name!: string;
    public date_of_birth!: number;
    public profile_picture_url! : string;
    public age! : number;
    public phone!: string;
    public password_hashed!: string;
    public is_deleted!: boolean;
    public email!: string;
    public Active!: boolean;
    public soft_delete!: boolean;

    // used for timestamps
    public readonly created_At!: Date;
    public readonly updated_At!: Date;
    public readonly deleted_At!: Date;
  id: WhereAttributeHashValue<string>;

}

users.init({
    user_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    user_name:{
        type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: {
          args: /^[a-zA-Z][a-zA-Z_0-9]*$/,
          msg: "User name must start with a letter and can contain only alphanumeric characters.",
        },
      },
    },
    name:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    date_of_birth:{
        type:DataTypes.INTEGER,
        allowNull: true,
    },
    profile_picture_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
    },
    password_hashed:{
        type:DataTypes.STRING,
        allowNull:true
    },
    is_deleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
    },
    Active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    soft_delete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},
    {
    timestamps:true,
    paranoid:true,
    sequelize:sequelizeConnection
})

export default users;


