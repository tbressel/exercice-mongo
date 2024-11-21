
export interface DatabaseModel  {
    host: string | undefined;
    port: number | undefined;
    name: string  | undefined;
  }

export interface DatabaseAuthModel {
    user: string | undefined;
    password: string | undefined;
    cdn: string | undefined;
} 
  