declare namespace NodeJS {
    export interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }