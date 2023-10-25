import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import verifyToken from './middlewares/authJWT';
import newsRoutes from './routes/news';
import cronjob from './cronjobs/fetchNews';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/news', verifyToken, newsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hi');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).send('<h1>404! Resource not found</h1>');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
