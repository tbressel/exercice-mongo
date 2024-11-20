/////////////////////////////////////////////////////
///////////  IMPORTATIONS & CONFIGURATION ///////////
/////////////////////////////////////////////////////

// EXPRESS JS (importation & definition)
import express, { Express, Request, Response, NextFunction } from "express";
const api: Express = express();

/////////////////////////////////////////////////////
///////////    MIDDLEWARES IMPORTATIONS   ///////////
/////////////////////////////////////////////////////

// CORS middleware
const cors = require('cors');
import CorsConfig from "../middlewares/CorsConfig";
const corsOptions = CorsConfig.getCorsConfig();
api.use(cors(corsOptions));



// BODY PARSER (Middleware to check data body from http request & configuration)
import { urlEncodedParserMiddleware, jsonParserMiddleware } from "../middlewares/body-parser";
api.use(urlEncodedParserMiddleware);
api.use(jsonParserMiddleware);



api.get('/test', (req: Request, res: Response, next: NextFunction) => {


    res.status(200).json({ message: "coucou" });

});



export default api;