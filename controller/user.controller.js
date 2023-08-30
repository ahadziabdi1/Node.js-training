import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import User from "../model/user.model.js";

export const getUsers = async (req, res) => {
  /*console.log(req.method);
  console.log(req.url);
  const db = fs.readFileSync("./db.json", "utf-8");
  const { users } = JSON.parse(db);
  const mappedUsers = users.map((user) => {
    delete user?.password;
    return user;
  });
  res.send(mappedUsers || []); */

  const users = await User.find();
  res.send(users);
};

export const getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findOne({ _id }).select("-password");

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    res.status(500).send("Something went wrong");
  }

  /*const id = req.params.id;
  const db = fs.readFileSync("./db.json", "utf-8");
  const { users } = JSON.parse(db);
  const user = users?.find((user) => user.id === id);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send("User not found");
  } */
};

export const createUser = (req, res) => {
  const user = req.body;
  user.id = uuidv4();
  const db = fs.readFileSync("./db.json", "utf-8");
  const parsedDb = JSON.parse(db);

  if (parsedDb.users) {
    parsedDb?.users?.push(user);
  } else {
    parsedDb.users = [user];
  }

  try {
    fs.writeFileSync("./db.json", JSON.stringify(parsedDb));
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const updateUser = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  const db = fs.readFileSync("./db.json", "utf-8");
  const parsedDb = JSON.parse(db);

  const index = parsedDb.users.findIndex((user) => user.id === id);
  parsedDb.users[index] = { ...user, password: parsedDb.users[index].password };

  try {
    fs.writeFileSync("./db.json", JSON.stringify(parsedDb));
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const patchUser = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  const db = fs.readFileSync("./db.json", "utf-8");
  const parsedDb = JSON.parse(db);

  const index = parsedDb.users.findIndex((user) => user.id === id);

  for (const [key, value] of Object.entries(user)) {
    parsedDb.users[index][key] = value;
  }

  try {
    fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const deleteUser = (req, res) => {
  const user = req.body;
  const id = req.params.id;

  const db = fs.readFileSync("./db.json", "utf-8");
  const parsedDb = JSON.parse(db);

  const index = parsedDb.users.findIndex((user) => user.id === id);

  if (index != -1) {
    try {
      parsedDb.users.splice(index, 1);
      fs.writeFileSync("./db.json", JSON.stringify(parsedDb, null, "\t"));
      res.status(204).send();
    } catch (e) {
      res.status(500).send("Something went wrong");
    }
  } else {
    res.status(404).send("User not found");
  }
};
