declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_STR: string;
      PORT: number;
      DB_NAME: string;
      COLLECTION: string;
      MONGO_IMAGE_STR: string;
      CONFIG_MONGODB_URL: string;
    }
  }
}

export {};
