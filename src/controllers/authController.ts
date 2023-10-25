import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userData from "../db/user-db.json";
import { writeToFile } from "../helpers/fileOperations";
import { User, userFromJSON } from "../models/userModel";
import { filterData } from "../helpers/filetrData";

const register = (req: Request, res: Response) => {
  const addUser = userFromJSON(req.body);
  if (addUser.status) {
    userData.users.push();
    const result = writeToFile(userData, "user");
    if (result.status) {
      return res.status(200).send(addUser.user);
    } else {
      return res.status(400).send({ message: result.message });
    }
  } else {
    return res.status(500).send({ message: addUser.message });
  }
};

const login = (req: Request, res: Response) => {
  const userMail = req.body.user_email;
  const passedPassword = req.body.password;
  const user = filterData(userMail, 4) as User[];
  if (user && user[0] !== null) {
    const isValidPassword = bcrypt.compareSync(
      passedPassword,
      user[0].password
    );

    if (isValidPassword) {
      const token = jwt.sign(
        {
          id: user[0].user_id,
        },
        process.env.API_SECRET as string,
        {
          expiresIn: 86400,
        }
      );
      return res.status(200).send({
        message: "Login Successful",
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "Wrong password" });
    }
  } else {
    return res.status(404).send({ message: "User not found" });
  }
};

export { register, login };
