import jwt from "jsonwebtoken";
import { decode } from "jsonwebtoken";

//use: if user wants to like a post
//click like button -> middleware will verify user, then move to next() -> like controller..
//so here we'll add middleware in likePost route. so, user can only like a post only once

//same thing is used for creating, updating or deleting post, whether you have right to to do so

// *Since we'll add middleware just before the value of controllers in the routes, controllers will 
// also have access to the values of middleware. example they can have access to req.userId which is in middleware*

const auth = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split("")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData= jwt.verify(token,"test");
            req.userId = decodedData?.userid;
        }else{
            decodedData= jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;