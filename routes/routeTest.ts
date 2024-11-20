/////////////////////////////////////////////////////
///////////  IMPORTATIONS & CONFIGURATION ///////////
/////////////////////////////////////////////////////

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

interface SendWeather {
  city: string;
  temp: string;
}

api.post("/send/", (req: Request, res: Response) => {
  // Get the city and temperature from the request body
  const weather: SendWeather = req.body;

  // Clean the city name and temperature
  const city = validator.escape(String(weather.city));
  const temp = validator.escape(String(weather.temp));

  console.log (typeof (weather.city), typeof (weather.temp));
  
  // Check if the request body is empty or not
  if (!weather.city || !weather.temp) {
      res.status(400).send("Please send a city and a temperature");
      return;
    }
    console.log (typeof (weather.city), typeof (weather.temp));

  res.status(200).json({
    message: `The city is ${city} and the temperature is ${temp}°C`,
  });
  return;
});

export default api;
