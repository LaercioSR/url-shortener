/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}
