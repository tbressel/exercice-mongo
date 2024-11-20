// import dotenv from 'dotenv';
require('dotenv').config();
 

/**
 * Class to manage the server configuration
 */
class ServerConfig {

  /**
   * 
   * Method to get the port address of the server.
   * 
   * @returns number
   */
  public static getApiListenPort(): number {

    // Get the port from the environment variable
    const portConfig: string | undefined = process.env.API_LISTEN_PORT;

    // Check if the port is defined
    if (portConfig == undefined) {
      console.error("No adress port defined for the server");
      process.exit(1);
    } else {
      const port: number = parseInt(portConfig);
      return port;
    }
  }
}

export default ServerConfig;