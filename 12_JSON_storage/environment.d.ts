declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_STR: string;
      PORT: number;
      DB_NAME: string;
      COLLECTION: string;
    }
  }
}

export {};
