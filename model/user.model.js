import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const { Schema } = mongoose;

const user = new Schema({
  name: String,
  email: String,
  date: {
    type: Date,
    default: Date(),
  },
  id: {
    type: String,
    default: uuidv4(),
  },
  password: String,
  role: String,
});

const User = mongoose.model("users", user);

export default User;
