import express from "express";
import { get } from "mongoose";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

//read
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);

//update
router.get("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;