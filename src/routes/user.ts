import express, { Request, Response } from 'express';
import userData from '../db/user-db.json';
import { filterData } from '../helpers/filetrData';
import { updateNewsPreferences } from '../helpers/updateUser';
import { register, login } from '../controllers/authController';

const userRoutes = express.Router();

userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: true }));

userRoutes.post('/register', register);


userRoutes.post('/login', login);

/**
 * Get all the preferences by userId
 */
userRoutes.get('/preferences/:id', (req: Request, res: Response) => {
  const user = filterData(req.params.id, 1); // 1 => user data where userId = passed id
  res.status(200).send((user as any[])[0].user_preferences);
});

/**
 * Add user preference
 * Request body: "news_preferences": "news_Preference"
 */
userRoutes.put('/preferences/:id', (req: Request, res: Response) => {
  const result = updateNewsPreferences(req.params.id, req.body.news_preferences);

  if (result.status) {
    res.status(200).send(userData);
  } else {
    res.status(400).send({ message: result.message });
  }
});

export default userRoutes;
