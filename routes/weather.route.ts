/////////////////////////////////////////////////////
///////////  IMPORTATIONS & CONFIGURATION ///////////
/////////////////////////////////////////////////////

// Types importation
import { SendWeather } from "../models/weather.model";
import { DatabaseModel } from "../models/database.model";

import DatabaseConfig from "../config/DatabaseConfig";

// EXPRESS JS (importation & definition)
import express, { Express, Request, Response } from "express";

const api: Express = express();

/////////////////////////////////////////////////////
///////////    MIDDLEWARES IMPORTATIONS   ///////////
/////////////////////////////////////////////////////

// CORS middleware
const cors = require("cors");
import CorsConfig from "../middlewares/CorsConfig";
const corsOptions = CorsConfig.getCorsConfig();
api.use(cors(corsOptions));

// BODY PARSER (Middleware to check data body from http request & configuration)
import {
  urlEncodedParserMiddleware,
  jsonParserMiddleware,
} from "../middlewares/body-parser";
api.use(urlEncodedParserMiddleware);
api.use(jsonParserMiddleware);

/////////////////////////////////////////////////////
///////////    LIBRARIES   IMPORTATIONS   ///////////
/////////////////////////////////////////////////////

// Validator library importation to check and clean datas from request
import validator from "validator";

import { MongoClient, Db, Collection } from "mongodb";

const databaseConfig = DatabaseConfig.getConfig();
const authDatabase = DatabaseConfig.getAuth();


// Build URI MongoDB (CDN or local)
const mongoURI: string = authDatabase.cdn
  ? `${authDatabase.cdn}/${databaseConfig.name}`
  : `mongodb://${authDatabase.user}:${authDatabase.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.name}`;

// client MongoDB creation and conenxion
const client: MongoClient = new MongoClient(mongoURI);

// get database name
const databaseName: string | undefined = databaseConfig.name;

(async () => {
  try {
    await client.connect();
    console.log(`MongoDB connected to ${authDatabase.cdn || databaseConfig.host}`);
  } catch (error) {
    console.error("Ooops MongoDB failed :", error);
  }
})();

////////////////////////////////////////////////////////////////
//////////   SEND CITY AND TEMPERATURE TO DATABASE   ///////////
////////////////////////////////////////////////////////////////

api.post("/send/", (req: Request, res: Response) => {
  // Get the city and temperature from the request body
  let weather: SendWeather = req.body;

  // Clean the city name and temperature (XSS failure)
  const city = validator.escape(String(weather.city));
  const temp = validator.toFloat(String(weather.temp));

  // Check if the request body is empty or not
  if (!weather.city || !weather.temp) {
    res.status(400).send("Please send a city and a temperature");
    return;
  }

  // Update the weather object with the cleaned values
  weather.city = city;
  weather.temp = temp;

  (async () => {
    try {
      await client.connect();

      const db: Db = client.db(databaseName);
      const usersCollection: Collection<SendWeather> = db.collection("weather");

      const result = await usersCollection.insertOne({
        city: weather.city,
        temp: weather.temp,
        date: new Date().toISOString(),
      });
      console.log("Ville ajoutée avec ID :", result);

      res.status(200).json({
        message: `The city is ${weather.city} and the temperature is ${weather.temp}°C`,
        body: result
      });
      return;

    } catch (error) {
      console.error("Erreur MongoDB :", error);

    } finally {
      await client.close();
    }
  })();


});


////////////////////////////////////////////////////////////////////
//////////   GET CITIES AND TEMPERATURES FROM DATABASE   ///////////
////////////////////////////////////////////////////////////////////

api.get("/get/", (req: Request, res: Response) => {
  (async () => {
    try {
      await client.connect();
     

      const db: Db = client.db(databaseName);
      const usersCollection: Collection<SendWeather> = db.collection("weather");

      const result = await usersCollection.find().toArray();
      // console.log("Liste de toutes les Villes :", result);

      res.status(200).json({
        result: result,
      });
      return;

    } catch (error) {
      console.error("Erreur MongoDB :", error);

    } finally {
      await client.close();
    }
  })();
});


///////////////////////////////////////////////////////////////////////
//////////   DELETE CITIES AND TEMPERATURES FROM DATABASE   ///////////
///////////////////////////////////////////////////////////////////////

api.delete("/delete/", (req: Request, res: Response) => {


  console.log("ID reçu :", req.query.id);

  (async () => {
    try {
      await client.connect();

      const db: Db = client.db(databaseName);
      const usersCollection: Collection<SendWeather> = db.collection("weather");

      const result = await usersCollection.deleteOne();

      res.status(200).json({
        result: result,
      });
      return;

    } catch (error) {
      console.error("Erreur MongoDB :", error);

    } finally {
      await client.close();
    }
  })();
});



export default api;
