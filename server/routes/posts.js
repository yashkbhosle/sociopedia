import express from "express";
import {getFeedPost,getUserPost,likePost} from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read
router.get("/",verifyToken,getFeedPost); 
router.get("/:userId/posts",verifyToken,getUserPost);

//update
router.patch("/:id/like",verifyToken,likePost);

export default router;