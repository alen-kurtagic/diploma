import { Request, Response, NextFunction } from "express";
import { format } from "date-fns";

const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    (req.socket.remoteAddress as string);

  res.on("finish", () => {
    const elapsed = Date.now() - start;
    const timestamp = format(new Date(), "dd.MM.yyyy HH:mm");
    console.log(
      `[${timestamp}] ${res.statusCode} ${ip} ${req.method} ${req.originalUrl} ${elapsed}ms`
    );
  });

  next();
};

export { logger };
