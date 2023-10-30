import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { body, validationResult } from "express-validator"; // Change the import
import userRoutes from "./routes/user";
import verifyToken from "./middlewares/authJWT";
import newsRoutes from "./routes/news";
import cronjob from "./cronjobs/fetchNews";
import rateLimit from "express-rate-limit";
import fs from "fs";
import path from "path";
import morgan from "morgan"; // Import the morgan package for logging

dotenv.config();
const app: Express = express();

export default app;

cronjob.start();

// Create a write stream for the logs
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// Use morgan for request logging with a combined format
app.use(morgan("combined", { stream: accessLogStream }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

const port: number = parseInt(process.env.PORT || "3000", 10);

app.use(helmet()); // Use Helmet for security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a custom validation middleware
app.use((req, res, next) => {
  body("username").notEmpty().run(req);
  body("email").isEmail().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/news", verifyToken, newsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hi");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("<h1>404! Resource not found</h1>");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
