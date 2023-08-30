import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware, getUsers);

router.get("/:id", authMiddleware, getUserById);

router.post("/", authMiddleware, createUser);

router.put("/:id", authMiddleware, updateUser);

router.patch("/:id", authMiddleware, patchUser);

router.delete("/:id", authMiddleware, deleteUser);

export default router;
