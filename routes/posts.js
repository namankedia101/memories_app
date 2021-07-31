import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// *Since we'll add middleware just before the value of controllers in the routes, controllers will 
// also have access to the values of middleware. example they can have access to req.userId which is in middleware*

router.get("/", getPosts);
router.post("/",auth, createPost);
router.patch("/:id",auth, updatePost);
router.delete("/:id",auth, deletePost);
router.patch("/:id/likePost",auth, likePost)

export default router; 