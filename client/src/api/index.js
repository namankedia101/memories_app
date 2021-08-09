import axios from "axios";

//const url = "https://obscure-escarpment-66598.herokuapp.com/posts";
const API = axios.create({ baseURL: 'https://obscure-escarpment-66598.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/api/posts/${id}`);
export const fetchPosts = (page) => API.get(`/api/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/api/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/api/posts', newPost);
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`);
export const comment = (value,id) => API.post(`/api/posts/${id}/commentPost`,{value});
export const updatePost = (id, updatedPost) => API.patch(`/api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/api/posts/${id}`);

export const signIn = (formData)=>API.post("/api/user/signin", formData);
export const signUp = (formData)=>API.post("/api/user/signup", formData);