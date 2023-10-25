import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      req.headers.authorization as string,
      process.env.API_SECRET as string, // Ensure you have the appropriate type for process.env.API_SECRET
      (err, decode) => {
        if (err) {
          req.user = undefined;
          req.message = "Header verification failed";
          next();
        } else {
          req.message = "Found Successfully";
          next();
        } 
      }
    );
  } else if (req.path === '/') {
    next();
  } else {
    res.status(500).send({ message: "Auth header not passed" });
  }
};

export default verifyToken;
