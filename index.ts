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
// Configuration de la base de données
const configDatabase: DatabaseModel = DatabaseConfig.getConfig();
const authDatabase: DatabaseAuthModel = DatabaseConfig.getAuth();

// Construction de l'URI MongoDB
let mongoURI: string;

if (authDatabase.cdn) {
    // Utilisez directement le CDN fourni
    mongoURI = `${authDatabase.cdn}/${configDatabase.name}`;
} else {
    // Connexion locale ou personnalisée
    mongoURI = `mongodb://${authDatabase.user}:${authDatabase.password}@${configDatabase.host}:${configDatabase.port}/${configDatabase.name}`;
}

// console.log("MongoDB URI:", mongoURI);

// const mongoURI: string = configDatabase.host + ':' + configDatabase.port;

///////////////////////////////////////////////
////////   CONNEXION À LA BASE DE DONNÉES /////
///////////////////////////////////////////////

// Initialisation du client MongoDB
const client: MongoClient = new MongoClient(mongoURI);

(async () => {
  try {
      console.log("Connecting to MongoDB...");
      await client.connect();
      console.log(`MongoDB connecté avec succès à ${authDatabase.cdn || configDatabase.host}`);
  } catch (error) {
      console.error('Erreur de connexion MongoDB :', error);
  } finally {
      // Note : Vous pouvez laisser le client connecté en fonction de votre application
      await client.close();
  }
})();
  


api.use('', routeTest);