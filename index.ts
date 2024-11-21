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
import { DatabaseAuthModel } from './models/database.model';

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
const authDatabase: DatabaseAuthModel = DatabaseConfig.getAuth();

// Build URI connexion
let mongoURI: string;

if (authDatabase.cdn) {
    // cdn connexion
    mongoURI = `${authDatabase.cdn}/${configDatabase.name}`;
} else {
    // cdn connexion
    mongoURI = `mongodb://${authDatabase.user}:${authDatabase.password}@${configDatabase.host}:${configDatabase.port}/${configDatabase.name}`;
}

// console.log("MongoDB URI:", mongoURI);

// const mongoURI: string = configDatabase.host + ':' + configDatabase.port;

///////////////////////////////////////////////
////////   CONNEXION À LA BASE DE DONNÉES /////
///////////////////////////////////////////////

// Mongodb client initialization
const client: MongoClient = new MongoClient(mongoURI);

(async () => {
  try {
      console.log("Connecting to MongoDB...");
      await client.connect();
      console.log(`MongoDB connected to ${authDatabase.cdn || configDatabase.host}`);
  } catch (error) {
      console.error('Ooops MongoDB failed :', error);
  } finally {
      await client.close();
  }
})();
  


api.use('', routeTest);