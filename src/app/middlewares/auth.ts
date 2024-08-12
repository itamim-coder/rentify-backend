/* eslint-disable no-async-promise-executor */
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";

import config from "../config";

const auth =
  (...requiredRoles: string[]) =>
  async (req: any, res: Response, next: NextFunction) => {
    return new Promise(async (resolve, reject) => {
      const token = req.headers.authorization;

      if (!token) {
        return reject(new AppError(httpStatus.UNAUTHORIZED, "Unauthorized"));
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      if (!verifiedUser) {
        return reject(new AppError(httpStatus.UNAUTHORIZED, "Unauthorized"));
      }

      req.user = verifiedUser;
      //   console.log("auth", req.user);
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        return reject(new AppError(httpStatus.FORBIDDEN, "Forbidden"));
      }

      resolve(verifiedUser);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
