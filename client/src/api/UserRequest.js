// import axios from "axios"

// const API = axios.create({baseURL: "http://localhost:5000"})

// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('profile'))
//     console.log(localStorage.getItem('profile'))
//     {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile').token)}`
//     }
//     return req
// })

// export const getUser = (userId)=> API.get(`/user/${userId}`)

// export const updateUser = (id, formData)=>API.put(`/user/${id}`, formData)

// export const getAllUser = ()=> API.get('/user')

// export const followUser = (id, data) => API.put(`/user/${id}/follow`, data)

// export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data)

import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (profile) {
    req.headers.Authorization = `Bearer ${profile.token}`;
  }
  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = async (id, formData) => {
  let data =  await API.put(`/user/${id}`, formData)
  console.log("DFGHJKd",data)
  return data
};

export const getAllUser = () => API.get("/user");

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
