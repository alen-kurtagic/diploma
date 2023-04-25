import { Request, Response, NextFunction } from "express";

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
};

export { cors };
