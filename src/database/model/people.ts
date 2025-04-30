import { DataTypes, Model, Optional } from "sequelize";
import * as dotenv from 'dotenv';
import sequelizeConnection from "../config";


dotenv.config();

interface PeopleAttributes {
  people_id: number;
  status: string;
}

export interface PeopleInput extends Optional<PeopleAttributes, "people_id"> {}

export interface PeopleOutput extends Required<PeopleAttributes> {}

class People extends Model<PeopleAttributes, PeopleInput> implements 
PeopleAttributes {
  public people_id!: number;
  public status!: string;

  public static associate() {
    // Adjust associations as per your requirements
  }
}

People.init(
  {
    people_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: 'sent',
        validate: {
          isIn: [['sent', 'received', 'blocked']], // Example of validating allowed values
        },
      },
      

  },
  {
    tableName: 'people',
    sequelize: sequelizeConnection,
  }
);



export default People;
