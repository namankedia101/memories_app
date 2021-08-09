import express from "express";
import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// *Since we'll add middleware just before the value of controllers in the routes, controllers will 
// also have access to the values of middleware. example they can have access to req.userId which is in middleware*

router.get("/api", getPosts);
router.get("/api/search", getPostsBySearch);
router.get("/api/:id", getPost);

router.post("/api",auth, createPost);
router.post("/api/:id/commentPost", commentPost);
router.patch("/api/:id",auth, updatePost);
router.delete("/api/:id",auth, deletePost);
router.patch("/api/:id/likePost",auth, likePost)

export default router; 