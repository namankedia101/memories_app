import mongoose  from "mongoose";

import PostMessage from "../models/postMessage.js";

// *Since we'll add middleware just before the value of controllers in the routes, controllers will 
// also have access to the values of middleware. example they can have access to req.userId which is in middleware*

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch(error) {
      res.status(404).json({message: error.message});
  }
};

export const createPost = async (req,res)=>{
    const post = req.body;
    const newPostMessage = new PostMessage({...post, creator:req.userId, createdAt:new Date().toISOString});

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async(req,res)=>{
  const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async(req, res)=>{
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  
  res.json({message:"Post deleted successfully"});
}

export const likePost = async(req,res)=>{
  const {id}= req.params;

  if(!req.userId)return({message:"Unauthenticated"});

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const post =await PostMessage.findById(id);
  const index = post.likes.findIndex((liked_userId)=>liked_userId===String(req.userId));

  if(index===-1){
    post.likes.push(req.userId);
  }else{
    post.likes=post.likes.filter((liked_userId)=>liked_userId!==String(req.userId));
  }

  const updatedPost =await PostMessage.findByIdAndUpdate(id, post, {new:true});

  res.json(updatedPost);
}