// import dotenv from 'dotenv';
require("dotenv").config();

import { DatabaseModel } from "../models/database.model";
import { DatabaseAuthModel } from "../models/database.model";



class DatabaseConfig {
  
  
  public static getConfig(): DatabaseModel {
    return {
      host: this.getHost(),
      port: this.getPort(),
      name: this.getName(),
    };
  }

  public static getAuth(): DatabaseAuthModel {
    return {
      user: this.getUserName(),
      password: this.getPassword(),
      cdn: this.getCdn(),
    };
  }


  /**
   * Method to get the number of pool connections.
   *
   * @returns number
   */
  private static getHost(): string | undefined {
    const host: string | undefined = process.env.DB_HOST;
    if (host === undefined) {
      console.error("No host defined for the database");
      return undefined;
    } else {
      return host;
    }
  }

  /**
   * Method to get the port address of the database.
   *
   * @returns number
   */
  private static getPort(): number | undefined {
    const portConfig: string | undefined = process.env.DB_PORT;
    if (portConfig === undefined) {
      console.error("No port set for the database");
      return undefined;
    } else {
      return parseInt(portConfig);
    }
  }

  /**
   * Method to get the name of the database set.
   *
   * @returns string
   */
  private static getName(): string | undefined {
    const dbName: string | undefined = process.env.DB_NAME;
    if (dbName === undefined) {
      console.error("No database name set");
    } else {
      return dbName;
    }
  }

/**
 * 
 * Method to get the user name set for the database.
 * 
 * @returns string
 */
  private static getUserName(): string | undefined {
    const userName: string | undefined = process.env.DB_USER;
    if (userName === undefined) {
      console.error("No user name set");
    } else {
      return userName;
    }
  }


  /**
   * 
   * Method to get the password set for the database.
   * 
   * @returns string
   */
  private static getPassword(): string | undefined {
    const password: string | undefined = process.env.DB_PASS;
    if (password === undefined) {
      console.error("No password set");
    } else {
      return password;
    }
  }

  /**
   * 
   * Method to get the CDN set for the database.
   * 
   * @returns string
   */
  private static getCdn(): string | undefined {
    const cdn: string | undefined = process.env.DB_CDN;
    if (cdn === undefined) {
      console.error("No CDN set");
    } else {
      return cdn;
    }
  }



}

export default DatabaseConfig;
