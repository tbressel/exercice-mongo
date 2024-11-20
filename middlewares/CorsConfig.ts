import { CorsList } from "../models/cors.model";

/**
 *
 * This class is used to configure the CORS middleware
 *
 */
class CorsConfig {


  /**
   *
   * @returns corsList
   *
   * This method returns the configuration of the CORS middleware
   *
   */
  public static getCorsConfig(): CorsList {
    const origins = this.getOrigins();
    const credentials = this.getCredentials();
    
    if (origins.length === 0) {
      throw new Error("La configuration CORS est invalide : Aucune origine autorisée définie.");
    }

    return {
      origin: origins,
      credentials: credentials,
      optionsSuccessStatus: 200,
    };
  }


  /**
   *
   * @returns string[]
   *
   * This method returns the allowed origins for the CORS middleware
   *
   */
  private static getOrigins(): string[] {
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS;
    if (!allowedOrigins) {
      console.error("No allowed origins set for the cors");
      return [];
    }
    const originsArray = allowedOrigins.split(",");
    // console.log("Origines autorisées : ", originsArray); 
    return originsArray;
  }

  /**
   *
   * Method to get the credentials for the CORS middleware
   *
   * @returns boolean
   */
  private static getCredentials(): boolean {
    const credentialsString = process.env.CORS_CREDENTIALS;
    if (credentialsString === undefined) {
      console.error("No credentials set for the cors");
      return false;
    }
    return credentialsString === "true";
  }

}

export default CorsConfig;