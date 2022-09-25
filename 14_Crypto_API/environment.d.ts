declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COINMARKET_TOKEN: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_USER: string;
      DB_HOST: string;
      PORT: number;
    }
  }
}

export {};
