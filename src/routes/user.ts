import express, { Request, Response } from 'express';
import userData from '../db/user-db.json';
import { filterData } from '../helpers/filetrData';
import { updateNewsPreferences } from '../helpers/updateUser';
import { register, login } from '../controllers/authController';
import { sanitizeUserPrefs, queryParamsValidator } from '../validators/inputValidators'; // Import the validator functions

const userRoutes = express.Router();

userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: true }));

userRoutes.post('/register', register);

userRoutes.post('/login', login);

/**
 * Get all the preferences by userId
 */
userRoutes.get('/preferences/:id', (req: Request, res: Response) => {
  // Use type assertion to treat req.query.userId as a string
  const userId = req.query.userId as string;
  const userIdValidation = queryParamsValidator(userId, 'string');
  if (!userIdValidation.status) {
    return res.status(400).send({ message: userIdValidation.message });
  }

  const user = filterData(req.params.id, 1);
  res.status(200).send((user as any[])[0].user_preferences);
});

/**
 * Add user preference
 * Request body: "news_preferences": "news_Preference"
 */
userRoutes.put('/preferences/:id', (req: Request, res: Response) => {
  // Validate the request body
  const prefsValidation = sanitizeUserPrefs(req.body.news_preferences);
  if (!prefsValidation.status) {
    return res.status(400).send({ message: prefsValidation.message });
  }

  // Explicitly check if req.params.id is a string
  if (typeof req.params.id === 'string') {
    // Validate the query parameter
    const userIdValidation = queryParamsValidator(req.params.id, 'string');
    if (!userIdValidation.status) {
      return res.status(400).send({ message: userIdValidation.message });
    }

    const result = updateNewsPreferences(req.params.id, prefsValidation.message);
    if (result.status) {
      res.status(200).send(userData);
    } else {
      res.status(400).send({ message: result.message });
    }
  } else {
    res.status(400).send({ message: 'Invalid userId parameter' });
  }
});

export default userRoutes;
