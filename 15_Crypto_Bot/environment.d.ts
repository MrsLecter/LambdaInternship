declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      BOT_TOKEN: string;
      API_HOST: string;
    }
  }
}

export {};
