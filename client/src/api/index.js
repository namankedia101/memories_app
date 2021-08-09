import axios from "axios";

//const url = "https://obscure-escarpment-66598.herokuapp.com/posts";
const API = axios.create({ baseURL: 'https://obscure-escarpment-66598.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/posts/api/${id}`);
export const fetchPosts = (page) => API.get(`/posts/api/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/api/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts/api', newPost);
export const likePost = (id) => API.patch(`/posts/api/${id}/likePost`);
export const comment = (value,id) => API.post(`/posts/api/${id}/commentPost`,{value});
export const updatePost = (id, updatedPost) => API.patch(`/posts/api/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/api/${id}`);

export const signIn = (formData)=>API.post("/user/api/signin", formData);
export const signUp = (formData)=>API.post("/user/api/signup", formData);