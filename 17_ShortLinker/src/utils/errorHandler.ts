export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;

  constructor(name: string, httpCode: HttpStatusCode, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export class DBError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    description = "Database connection error",
  ) {
    super(name, httpCode, description);
  }
}

export class LackOfDataError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.BAD_REQUEST,
    description = "Insufficient data",
  ) {
    super(name, httpCode, description);
  }
}
