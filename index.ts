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
import routeTest from './routes/routeTest';


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

// CORS definition
const cors = require('cors');


api.use('', routeTest);