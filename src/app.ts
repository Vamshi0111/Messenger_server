// import express,{Express}from "express";
// import dbInit from './database/init';
// import routes from "./database/routes";
// import cors from 'cors';
// import dotenv from 'dotenv'
// import bodyParser from "body-parser";
// import sequelize from "sequelize";
// import sequelizeConnection from "./database/config";
// const app = express();
// const port = process.env.PORT || 3000;

// dotenv.config();

// app.use(express.json())

// app.use (cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))

// dbInit()

// app.use('/api/v1',routes)

// app.get('/', (req,res)=>{
//     res.send("Hello Messengerteam");
// });

//     // sequelizeConnection.sync({ force:true }).then (() =>{
//     //         app.listen(port,() =>{
//     //             console.log(`Server is running on http://localhost:${port}`);
//     //         });
//     // });  // used for table drop and create new one
        
//         app.listen(port, () =>{
//             console.log(`server is running on port ${port}`);
//         });


import express from 'express';
import http from 'http';
import dbInit from './database/init';
import routes from './database/routes';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { initializeSocket } from '../src/database/socket/socket'; 
import sequelizeConnection from './database/config';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dbInit();

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send("Hello Messengerteam");
});

        // sequelizeConnection.sync({ force:true }).then (() =>{
        //     app.listen(port,() =>{
        //         console.log(`Server is running on http://localhost:${port}`);
        //     });
        // }); 


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});