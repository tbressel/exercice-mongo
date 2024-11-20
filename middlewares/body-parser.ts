import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

/**
 * 
 * Middleware to parse url encoded data
 * Analyse HTTP request body and convert it into a string or object
 * 
 * data types: application/x-www-form-urlencoded
 * 
 * @param req : Therequest object reveived from the client
 * @param res : The response object to send back to the client
 * @param next : The next function to call the next middleware
 */
export function urlEncodedParserMiddleware(req: Request, res: Response, next: NextFunction) {
    bodyParser.urlencoded({
        extended: true 
    })
    (req, res, next);
}

/**
 * 
 * Middleware to parse json data
 * Analyse HTTP request body and convert it into a string or object
 *
 * data types: application/json
 *  
 * @param req : The request object reveived from the client
 * @param res : The response object to send back to the client
 * @param next : The next function to call the next middleware
 */
export function jsonParserMiddleware(req: Request, res: Response, next: NextFunction) {
    bodyParser.json()
    (req, res, next);
}