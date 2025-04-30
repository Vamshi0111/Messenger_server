import { Dialect,Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbHost = process.env.RDS_HOSTNAME;
const dbPort = process.env.RDS_PORT;
const dbUsername = process.env.RDS_USERNAME as string;
const dbPassword = process.env.RDS_PASSWORD as string;
const dbName = process.env.RDS_DB_NAME as string;


function getConnection () {
    return new Sequelize ('postgres','postgres.hnkmgglzmarrwhnikhzk','sttBsrBTgSiM0Dqp',{
        host:'aws-0-ap-south-1.pooler.supabase.com',
        port:6543,
        dialect:'postgres'
    });
}

const sequelizeConnection = getConnection();

export default sequelizeConnection;
