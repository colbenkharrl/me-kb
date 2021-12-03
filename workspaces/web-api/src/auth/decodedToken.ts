import { Request } from "express";
import jwt from "jsonwebtoken";
import { UserRecord } from "../db/types";

export const decodedToken = (
  req: Request<any, any, any, any>,
  jwtSecret: string | undefined
) => {
  if (!req || !jwtSecret) {
    return null;
  }

  try {
    return jwt.verify(req?.session?.token, jwtSecret) as UserRecord;
  } catch {
    return null;
  }
};
