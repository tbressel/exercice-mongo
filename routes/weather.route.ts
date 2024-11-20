/////////////////////////////////////////////////////
///////////  IMPORTATIONS & CONFIGURATION ///////////
/////////////////////////////////////////////////////

// Types importation
import { SendWeather } from "../models/weather.model";

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
const mongoURI: string = "mongodb://127.0.0.1:27017";
const client: MongoClient = new MongoClient(mongoURI);



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
      console.log(`MongoDB OK`);

      const db: Db = client.db("exercice-mongo");
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




////////////////////////////////////////////////////////////////
//////////   GET CITIES AND TEMPERATURES FROM DATABASE   ///////////
////////////////////////////////////////////////////////////////

api.get("/get/", (req: Request, res: Response) => {
  (async () => {
    try {
      await client.connect();
      console.log(`MongoDB OK`);

      const db: Db = client.db("exercice-mongo");
      const usersCollection: Collection<SendWeather> = db.collection("weather");

      const result = await usersCollection.find().toArray();
      console.log("Ville ajoutée avec ID :", result);

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
