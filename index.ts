/**
 * The main server file for the React_Node application.
 * @module index
**/


/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// ConfigServer importation
import ServerConfig from './config/ServerConfig';
import DatabaseConfig from './config/DatabaseConfig';

// DatabaseModel importation
import { DatabaseModel } from './models/database.model';

// Express importation
import express, { Express } from "express";

// interface app components routes
import routeTest from './routes/weather.route';


import { MongoClient } from 'mongodb';


////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////

// Express definition
const api: Express = express();

// get port server number from ServerConfig
const configPort: ServerConfig = ServerConfig.getApiListenPort();
api.listen(configPort, () => {
    console.warn('Server listened on port number ', configPort);
});

// get database configuration from DatabaseConfig
const configDatabase: DatabaseModel = DatabaseConfig.getConfig();


const mongoURI: string = configDatabase.host + ':' + configDatabase.port;
const client: MongoClient = new MongoClient(mongoURI);

(async () => {
    try {
      await client.connect();
      console.log(`MongoDB connecté sur le port ${configDatabase.port}`);
    } catch (error) {
      console.error('Erreur MongoDB :', error);
    } finally {
      await client.close();
    }
  })();
  


api.use('', routeTest);