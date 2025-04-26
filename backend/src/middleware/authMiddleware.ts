import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import config from "../config/config";

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  console.log(`token ${token}`);

  if (token) {
    try {
      const decodedInfo = jwt.verify(token, config.jwt_secret);
      if (decodedInfo) {
        console.log(decodedInfo);
        req.userId = (decodedInfo as JwtPayload)._id;
        next();
      }
    } catch (error) {
      throw new AppError("invalid or expired token!", 401, {});
    }
  } else {
    res
      .status(401)
      .json({ succes: false, message: "no authorization token available!" });
  }
}

export default auth;
