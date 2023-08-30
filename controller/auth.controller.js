import fs from "fs";
import bcrypt from "bcrypt";
import { ROLES, SALT_ROUNDS, SECRET } from "../constants.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const registerUser = async (req, res) => {
  /*const user = req.body;
  let db = fs.readFileSync("./db.json", "utf-8");

  const parsedDb = JSON.parse(db);

  try {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const userToSave = {
      ...user,
      password: hashedPassword,
      id: uuidv4(),
      role: ROLES.USER,
    };

    parsedDb.users.push(userToSave);

    fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
    delete user.password;

    res.status(201).send({ ...user, id: userToSave.id });
  } catch (e) {
    res.status(500).send("Something went wrong");
  } */

  const { password, ...user } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const userToSave = new User({
      user,
      password: hashedPassword,
      role: ROLES.USER,
    });

    await userToSave.save();

    res.status(201).send();
  } catch (e) {
    res.status(500).send("Colud not register user");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        {
          data: { id: user.id, role: user.role },
        },
        SECRET,
        { expiresIn: 60 * 60 }
      );
      res.status(200).send(token);
    }
  } catch (e) {
    res.status(401).send("Login failed");
  }

  /*const { email, password } = req.body;
  let db = fs.readFileSync("./db.json", "utf-8");

  const parsedDb = JSON.parse(db);
  const user = parsedDb.users.find((user) => user.email === email);

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const token = jwt.sign(
      {
        data: { id: user.id, role: user.role },
      },
      SECRET,
      { expiresIn: 160 * 160 }
    );
    res.status(200).send(token);
  } else {
    res.status(401).send("Login failed");
  } */
};

export const validate = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded) {
      res.status(200).send("Ok");
    } else {
      res.status(500).send("Something went wrong");
    }
  } catch (e) {
    res.status(401).send("Invalid");
  }
};
