import { CREATE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from "../constants/actionTypes";
import * as api from "../api"; //imports everything from api as api

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts=(page)=> async (dispatch)=>{
    try {
        dispatch({type:START_LOADING});
        const { data: { data, currentPage, numberOfPages } }=await api.fetchPosts(page);
        dispatch({type:FETCH_ALL, payload:{data, currentPage, numberOfPages }});
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch=(searchQuery)=> async (dispatch)=>{
  try {
      dispatch({type:START_LOADING});
      const { data: { data }}=await api.fetchPostsBySearch(searchQuery);
      dispatch({type:FETCH_BY_SEARCH, payload:{data}});
      dispatch({type:END_LOADING});
  } catch (error) {
      console.log(error);
  }
}

export const createPost = (post,history) => async (dispatch) => {
    try {
      dispatch({type:START_LOADING});
      const { data } = await api.createPost(post);
      history.push(`/posts/${data._id}`);
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  

  export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);
  
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deletePost=(id)=> async (dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type:DELETE, payload:id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost=(id)=> async(dispatch)=>{
    try {
        const {data}=await api.likePost(id);
        dispatch({type:LIKE, payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const commentPost=(value,id)=> async(dispatch)=>{
  try {
      const {data} = await api.comment(value,id);
      dispatch({type:COMMENT, payload:data});
      return data.comments;
  } catch (error) {
      console.log(error);
  }
}