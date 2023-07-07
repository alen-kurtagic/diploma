import { Request, Response, Router, NextFunction } from "express";

const router = Router();

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  if (error instanceof TypeError) {
    res.status(400).send(error.message);
  } else if (error instanceof Error) {
    res.status(500).send(error.message);
  }
};

router.use(errorHandler);
