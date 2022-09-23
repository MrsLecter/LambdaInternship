export type userObjType = {
  email: string;
  password: string;
};

export type tokenObjType = {
  token: string;
};

export type newTokenObjType = {
  accessToken: string;
  refreshToken: string;
  TTL: number;
};

export type urlObjType = {
  id: number;
  email: string;
  url: string;
  url_shorted: string;
};

export type prettiedUrlObjType = { url_original: string; url_shorted: string };
