import express from "express";
import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// *Since we'll add middleware just before the value of controllers in the routes, controllers will 
// also have access to the values of middleware. example they can have access to req.userId which is in middleware*

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);

router.post("/",auth, createPost);
router.post("/:id/commentPost", commentPost);
router.patch("/:id",auth, updatePost);
router.delete("/:id",auth, deletePost);
router.patch("/:id/likePost",auth, likePost)

export default router; 