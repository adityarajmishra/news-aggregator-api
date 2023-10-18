import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userData from '../db/user-db.json';
import { writeToFile } from '../helpers/fileOperations';
import { userFromJSON } from '../models/userModel';
import { filterData } from '../helpers/filterData';

/**
 * To Register/Signup the user
 * Endpoint: /api/user/register
 * 
 * @param {userData from user/front-end} req 
 * @param {status: !status, message: "User added successfully"} res 
 * @returns status: !status, message: "User added successfully"
 */
const register = (req: Request, res: Response) => {
  const addUser = userFromJSON(req.body);
  if (addUser.status) {
    userData.users.push(addUser.user);
    const result = writeToFile(userData, "user");
    if (result.status) {
      return res.status(200).send(addUser);
    } else {
      return res.status(400).send({ message: result.message });
    }
  } else {
    return res.status(500).send({ message: addUser.message });
  }
};

/**
 * To login
 * Endpoint /api/user/login
 * 
 * @param {userMail, password} req 
 * @param {if (true) {jwt} else {error related}} res 
 * @returns 
 */
const login = (req: Request, res: Response) => {
  const userMail = req.body.user_email;
  const passedPassword = req.body.password;
  const user = filterData(userMail, 4);
  if (user[0] !== null) {
    const isValidPassword = bcrypt.compareSync(passedPassword, user[0].password);

    if (isValidPassword) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET as string, // Ensure you have the appropriate type for process.env.API_SECRET
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).send({
        message: "Login Successful",
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "wrong password" });
    }
  } else {
    return res.status(404).send({ message: "user not found" });
  }
};

export { register, login };
