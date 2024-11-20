/**
 * The main server file for the React_Node application.
 * @module index
**/


/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// ConfigServer importation
import ServerConfig from './config/ServerConfig';

// Express importation
import express, { Express } from "express";

// interface app components routes
import routeTest from './routes/weather.route';


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



import { MongoClient } from 'mongodb';
const mongoURI: string = 'mongodb://127.0.0.1:27017';
const client: MongoClient = new MongoClient(mongoURI);
const port: string = new URL(mongoURI).port;

(async () => {
    try {
      await client.connect();
      console.log(`MongoDB connecté sur le port ${port}`);
  
    //   const db: Db = client.db('exercice-mongo');
    //   const usersCollection: Collection<SendWeather> = db.collection('weather');
  
   
    //   const result = await usersCollection.find().toArray();
    //   console.log('Ville ajoutée avec ID :', result);
  
    } catch (error) {
      console.error('Erreur MongoDB :', error);
    } finally {
      await client.close();
    }
  })();
  




api.use('', routeTest);